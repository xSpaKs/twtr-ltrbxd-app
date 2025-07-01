import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AppLayout from "../components/AppLayout";
import { MainScreenTopBar } from "../components/Bars/MainScreenTopBar";
import { useApi } from "../api/useApi";
import { styles } from "../styles/ForgotPassword.styles";
import { goToLogin } from "../helpers/navigation.helper";

const ResetPasswordScreen = () => {
    const route = useRoute();
    const { email, code } = route.params || {};

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { call } = useApi();

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            return Alert.alert("Error", "Passwords do not match");
        }

        if (password.length < 6) {
            return Alert.alert(
                "Error",
                "Password must contain at least 6 characters"
            );
        }

        setLoading(true);
        try {
            await call("post", "reset-password", {
                email,
                code,
                password,
                password_confirmation: confirmPassword,
            });

            Alert.alert("Success", "Password successfully updated.");
            goToLogin();
        } catch (error) {
            Alert.alert("Error", error.response?.data.message);
        } finally {
            setLoading(false);
        }
    };

    const disabled = loading || !password || !confirmPassword;

    return (
        <AppLayout>
            <MainScreenTopBar />
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>New password</Text>

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            disabled && styles.buttonDisabled,
                        ]}
                        onPress={handleResetPassword}
                        disabled={disabled}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Updating..." : "Change password"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
};

export default ResetPasswordScreen;
