import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Button,
} from "react-native";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";

export default function ProfileScreen() {
    const { logoutContext } = useAuth();
    const handleLogout = async () => {
        const response = await API.call("post", "logout", {}, true);
        logoutContext();
    };
    return (
        <AppLayout>
            <View style={styles.container}>
                <Text>Profile</Text>
                <Button title="Logout" onPress={handleLogout}></Button>
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: "bold" },
    content: { marginTop: 10, fontSize: 16 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
