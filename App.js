import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/AppRoutes";
import { navigationRef } from "./navigation/RootNavigation";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer ref={navigationRef}>
                <AppRoutes />
            </NavigationContainer>
        </AuthProvider>
    );
}
