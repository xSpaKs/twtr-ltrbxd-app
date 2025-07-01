import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { goToLogin } from "../helpers/navigation.helper";
import { styles } from "../styles/Register.styles";
import { MainScreenTopBar } from "../components/Bars/MainScreenTopBar";
import AppLayout from "../components/AppLayout";
import { useApi } from "../api/useApi";

export default function RegisterScreen() {
    const [username, setUsername] = useState("xSpaKs");
    const [email, setEmail] = useState("aranhiblot20@gmail.com");
    const [password, setPassword] = useState("aaaaaaaa1");
    const [passwordConfirm, setPasswordConfirm] = useState("aaaaaaaa1");
    const { loginContext } = useAuth();
    const { call } = useApi();

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            return Alert.alert("Error", "Passwords do not match.");
        }

        try {
            const data = await call("post", "register", {
                username,
                email,
                password,
            });
            const { user, token } = data;
            await loginContext(user, token);
        } catch (err) {
            Alert.alert("", err.response.data.message);
        }
    };

    return (
        <AppLayout>
            <MainScreenTopBar />
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Register</Text>

                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        placeholder="Password confirmation"
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={styles.registerLink}>
                            You have an account ? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
}
