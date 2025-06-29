import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import { goToRegister } from "../helpers/navigation.helper";
import { MainScreenTopBar } from "../components/Bars/MainScreenTopBar";
import { styles } from "../styles/Login.styles";
import AppLayout from "../components/AppLayout";

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
            Alert.alert("", err.response.data.message);
        }
    };

    return (
        <>
            <AppLayout>
                <MainScreenTopBar />
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

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Se connecter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToRegister}>
                            <Text style={styles.registerLink}>
                                Pas encore inscrit ? Créer un compte
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </AppLayout>
        </>
    );
}
