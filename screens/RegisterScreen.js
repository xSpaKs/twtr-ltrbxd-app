import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("xSpaKs");
    const [email, setEmail] = useState("aranhiblot20@gmail.com");
    const [password, setPassword] = useState("Bm1vx3;I");
    const [passwordConfirm, setPasswordConfirm] = useState("Bm1vx3;I");
    const { loginContext } = useAuth();

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            return Alert.alert(
                "Erreur",
                "Les mots de passe ne correspondent pas."
            );
        }

        try {
            const data = await API.call("post", "register", {
                username,
                email,
                password,
            });
            const { user, token } = data;
            await loginContext(user, token);
        } catch (err) {
            Alert.alert(
                "Erreur",
                "Une erreur est survenue lors de l'inscription."
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Créer un compte</Text>

                <TextInput
                    placeholder="Nom d'utilisateur"
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
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <TextInput
                    placeholder="Confirmation du mot de passe"
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
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.registerLink}>
                        Déjà un compte ? Connectez-vous
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f9f9f9",
    },
    form: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 24,
        textAlign: "center",
        color: "#333",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#333",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    registerLink: {
        marginTop: 16,
        textAlign: "center",
        color: "#555",
        textDecorationLine: "underline",
    },
});
