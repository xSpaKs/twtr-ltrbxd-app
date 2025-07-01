import AppLayout from "../components/AppLayout";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/ForgotPassword.styles";
import { useApi } from "../api/useApi";
import { MainScreenTopBar } from "../components/Bars/MainScreenTopBar";
import { goToResetPassword } from "../helpers/navigation.helper";

const VerifyResetCodeScreen = ({ route }) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const { call } = useApi();
    const { email } = route.params;
    console.log(email);

    const isValidCode = (c) => /^\d{6}$/.test(c.trim());

    const handleVerifyCode = async () => {
        if (!isValidCode(code)) {
            Alert.alert("Erreur", "Code invalide (6 chiffres attendus)");
            return;
        }

        setLoading(true);
        try {
            await call("post", "verify-reset-code", {
                email,
                code: code.trim(),
            });

            goToResetPassword(email, code.trim());
        } catch (error) {
            Alert.alert("Erreur", error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const disabled = !isValidCode(code) || loading;

    return (
        <AppLayout>
            <MainScreenTopBar />
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Reset code</Text>

                    <TextInput
                        placeholder="Enter your reset code"
                        value={code}
                        onChangeText={setCode}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            disabled && styles.buttonDisabled,
                        ]}
                        onPress={handleVerifyCode}
                        disabled={disabled}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Verifying..." : "Validate"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
};

export default VerifyResetCodeScreen;
