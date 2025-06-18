import React, { useEffect, useState } from "react";
import { HOME_API_URL } from "@env";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";

const EditProfileScreen = ({ route }) => {
    const { user } = route.params;
    const { token } = useAuth();
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");
    const [bio, setBio] = useState(user.bio || "");
    const [avatar, setAvatar] = useState(user.profile_picture_url || null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setAvatar(selectedImageUri);
            handleSavePicture(selectedImageUri);
        }
    };

    const handleSaveInfos = async () => {
        data = {
            username: username,
            email: email,
            bio: bio,
        };

        await API.call("put", "users/updateInfos", data, true);
    };

    const handleSavePicture = async (imageUri) => {
        const formData = new FormData();

        if (imageUri && imageUri.startsWith("file://")) {
            const fileName = imageUri.split("/").pop();
            const fileType = fileName.split(".").pop();

            formData.append("avatar", {
                uri: imageUri,
                name: fileName,
                type: `image/${fileType}`,
            });
        }

        for (let [key, value] of formData.entries()) {
            console.log("formData:", key, value);
        }

        try {
            const response = await fetch(
                `${HOME_API_URL}/users/updatePicture`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );

            const result = await response.json();
            console.log("✅ Upload success:", result);
        } catch (error) {
            console.log("❌ Upload failed:", error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>
                            Ajouter une photo
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Votre nom"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Votre email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Biographie</Text>
            <TextInput
                style={styles.textArea}
                value={bio}
                onChangeText={setBio}
                placeholder="Parlez un peu de vous..."
                multiline
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveInfos}
            >
                <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginBottom: 20,
    },
    placeholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },
    placeholderText: {
        color: "#555",
        fontSize: 12,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
        height: 100,
    },
    saveButton: {
        backgroundColor: "#333",
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default EditProfileScreen;
