import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";
import AppRoutes from "./components/AppRoutes";
import { navigationRef } from "./navigation/navigation";

import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        SystemUI.setBackgroundColorAsync("#ffffff"); // ou "#FAFAFA"
    }, []);
    return (
        <AuthProvider>
            <MovieProvider>
                <NavigationContainer ref={navigationRef}>
                    <AppRoutes />
                </NavigationContainer>
            </MovieProvider>
        </AuthProvider>
    );
}
