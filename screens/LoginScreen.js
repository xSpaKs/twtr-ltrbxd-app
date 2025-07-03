import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { goToRegister } from "../helpers/navigation.helper";
import { MainScreenTopBar } from "../components/Bars/MainScreenTopBar";
import { styles } from "../styles/Login.styles";
import AppLayout from "../components/AppLayout";
import { useApi } from "../api/useApi";
import { goToForgottenPassword } from "../helpers/navigation.helper";

export default function LoginScreen() {
    const [login, setLogin] = useState("testuser@gmail.com");
    const [password, setPassword] = useState("aaaaaaaa1");
    const { loginContext } = useAuth();
    const { call } = useApi();

    const handleLogin = async () => {
        try {
            const data = await call("post", "login", {
                login: login,
                password: password,
            });
            const { user, token } = data;
            await loginContext(user, token);
        } catch (err) {
            if (err.response.status != 403) {
                Alert.alert("Error", err.response.data.message);
            }
        }
    };

    return (
        <>
            <AppLayout>
                <MainScreenTopBar />
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Login</Text>

                        <TextInput
                            placeholder="Username or email"
                            value={login}
                            onChangeText={setLogin}
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

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToForgottenPassword}>
                            <Text style={styles.registerLink}>
                                Forgot password ?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToRegister}>
                            <Text style={styles.registerLink}>
                                Not registered yet ? Create an account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </AppLayout>
        </>
    );
}
