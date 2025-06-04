// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import API from "../api/API";

export default function LoginScreen({ navigation }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await API.post("/login", { email, password });
            Alert.alert("Connexion réussie", JSON.stringify(response.data));
            // TODO: save token, navigate, etc.
        } catch (err) {
            Alert.alert("Erreur", "Email ou mot de passe incorrect");
        }
    };

    return (
        <View style={{ padding: 24 }}>
            <TextInput
                placeholder="Username or email"
                value={login}
                onChangeText={setLogin}
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

            <Button title="Login" onPress={handleLogin} />

            <Text
                style={{ marginTop: 16 }}
                onPress={() => navigation.navigate("Register")}
            >
                Not registered ? Create an account
            </Text>
        </View>
    );
}
