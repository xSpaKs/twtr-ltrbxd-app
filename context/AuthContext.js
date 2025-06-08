import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("token");
                if (storedToken) {
                    setToken(storedToken);
                    const storedUser = await SecureStore.getItemAsync("user");
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (e) {
                console.error("Erreur récupération token :", e);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);

    const loginContext = async (user, token) => {
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const logoutContext = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loginContext,
                logoutContext,
                isAuthenticated: !!token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
