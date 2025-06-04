// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import API from "../api/API";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            return Alert.alert("Erreur", "Passwords do not match.");
        }

        try {
            const response = await API.post("/register", { email, password });
            Alert.alert("Account created", "You can now log in");
            navigation.navigate("Login");
        } catch (err) {
            Alert.alert("Error", "Registration not possible");
        }
    };

    return (
        <View style={{ padding: 24 }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>Registration</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={{ marginBottom: 12, borderBottomWidth: 1 }}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 12, borderBottomWidth: 1 }}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginBottom: 12, borderBottomWidth: 1 }}
            />

            <TextInput
                placeholder="Confirmation"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                style={{ marginBottom: 12, borderBottomWidth: 1 }}
            />

            <Button title="Créer un compte" onPress={handleRegister} />

            <Text
                style={{ marginTop: 16 }}
                onPress={() => navigation.navigate("Login")}
            >
                Déjà un compte ? Connectez-vous
            </Text>
        </View>
    );
}
