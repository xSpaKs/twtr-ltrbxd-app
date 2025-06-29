import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import { goToLogin } from "../helpers/navigation.helper";
import { styles } from "../styles/Register.styles";

export default function RegisterScreen() {
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
            Alert.alert("", err.response.data.message);
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

                <TouchableOpacity onPress={goToLogin}>
                    <Text style={styles.registerLink}>
                        Déjà un compte ? Connectez-vous
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
