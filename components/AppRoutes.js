import React from "react";
import { View, ActivityIndicator, TopTab } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AddPostScreen from "../screens/AddPostScreen";
import PostScreen from "../screens/PostScreen";
import ReviewScreen from "../screens/ReviewScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ListDiscussionsScreen from "../screens/ListDiscussionsScreen";
import TimelineTabs from "../components/TimelineTabs";
import CustomTabBar from "./CustomTabBar";
import ScreensWithTabs from "./ScreensWithTab";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Auth" component={ScreensWithTabs} />
                    </>
                )}
            </Stack.Navigator>
        </>
    );
}
