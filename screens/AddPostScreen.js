import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    ActivityIndicator,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useNavigation } from "@react-navigation/native";

export default function AddPostScreen({}) {
    const [postText, setPostText] = useState("");
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!postText.trim()) {
            alert("Veuillez écrire un post.");
            return;
        }

        await API.call("post", "posts", { content: postText }, true);

        alert("Post publié !");
        navigation.navigate("Timeline", { refresh: true });
    };

    return (
        <AppLayout>
            <View style={styles.container}>
                <Text style={styles.label}>Ton message :</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    placeholder="Exprime-toi..."
                    value={postText}
                    onChangeText={setPostText}
                />

                <Button title="Publier" onPress={handleSubmit} />
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 12,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
    },
    movieItem: {
        padding: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    selectedMovie: {
        backgroundColor: "#d0f0c0",
    },
    selectedLabel: {
        marginVertical: 10,
        fontStyle: "italic",
    },
});
