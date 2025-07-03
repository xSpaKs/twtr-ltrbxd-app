import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        logoutContext();
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("token");
                if (storedToken) {
                    setToken(storedToken);
                    const storedUser = await SecureStore.getItemAsync("user");
                    if (storedUser) {
                        setLoggedUser(JSON.parse(storedUser));
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

    const loginContext = async (loggedUser, token) => {
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("user", JSON.stringify(loggedUser));
        setToken(token);
        setLoggedUser(loggedUser);
    };

    const logoutContext = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        setToken(null);
        setLoggedUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                loggedUser,
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
