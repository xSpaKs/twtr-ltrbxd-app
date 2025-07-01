import AppLayout from "../components/AppLayout";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/ForgotPassword.styles";
import { useApi } from "../api/useApi";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { goToVerifyResetCode } from "../helpers/navigation.helper";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { call } = useApi();

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.trim());
    };

    const handleForgottenPassword = async () => {
        if (!isValidEmail(email)) return;

        setLoading(true);
        try {
            await call("post", "forgot-password", {
                email: email.trim(),
            });

            Alert.alert(
                "Check your inbox",
                "An email has been sent to reset your password"
            );

            goToVerifyResetCode(email);
        } catch (error) {
            Alert.alert(
                "Error",
                error?.response?.data?.message ||
                    "Unable to send reset email. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const disabled = !isValidEmail(email) || loading;

    return (
        <AppLayout>
            <BasicTopBar title={"Forgot password"} />
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Forgotten password</Text>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            disabled && styles.buttonDisabled,
                        ]}
                        onPress={handleForgottenPassword}
                        disabled={disabled}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Sending..." : "Confirm"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
};

export default ForgotPasswordScreen;
