import React, { useState } from "react";
import {
    HOME_API_URL,
    HOME_WIFI_URL,
    SCHOOL_API_URL,
    SHARE_API_URL,
} from "@env";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/AuthContext";
import BasicTopBar from "../components/Bars/BasicTopBar";
import AppLayout from "../components/AppLayout";
import { goToProfile } from "../helpers/navigation.helper";
import { styles } from "../styles/EditProfile.styles";
import { useApi } from "../api/useApi";

const EditProfileScreen = ({ route }) => {
    const { user } = route.params;
    const { token } = useAuth();
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");
    const [bio, setBio] = useState(user.bio || "");
    const [avatar, setAvatar] = useState(user.profile_picture_url || null);
    const { call } = useApi();

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

        await call("put", "users/updateInfos", data, true);
        goToProfile(user.id);
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

        try {
            const response = await fetch(
                `${SHARE_API_URL}/users/updatePicture`,
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppLayout>
            <BasicTopBar title={"Edit profile"} />
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={pickImage}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Text style={styles.placeholderText}>
                                Choose a picture
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

                <Text style={styles.label}>Bio</Text>
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
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppLayout>
    );
};

export default EditProfileScreen;
