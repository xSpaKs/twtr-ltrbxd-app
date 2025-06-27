import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";
import AppRoutes from "./components/AppRoutes";
import { navigationRef } from "./navigation/navigation";

export default function App() {
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
