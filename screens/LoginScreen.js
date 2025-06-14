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

export default function LoginScreen({ navigation }) {
    const [login, setLogin] = useState("xSpaKs");
    const [password, setPassword] = useState("aaaaaaaa1");
    const { loginContext } = useAuth();

    const handleLogin = async () => {
        try {
            const data = await API.call("post", "login", {
                login: login,
                password: password,
            });
            const { user, token } = data;
            await loginContext(user, token);
        } catch (err) {
            Alert.alert("Erreur", "Email ou mot de passe incorrect");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Connexion</Text>

                <TextInput
                    placeholder="Email ou nom d'utilisateur"
                    value={login}
                    onChangeText={setLogin}
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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.registerLink}>
                        Pas encore inscrit ? Créer un compte
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
