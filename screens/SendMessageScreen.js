import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Image,
    ActivityIndicator,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useNavigation } from "@react-navigation/native";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { goToDiscussion } from "../helpers/navigation.helper";

export default function SendMessageScreen({ route }) {
    const { otherUser, followings, followers } = route.params;
    const [messageText, setMessageText] = useState("");
    const navigation = useNavigation();

    const sendMessage = async () => {
        if (!messageText.trim()) {
            alert("Veuillez écrire un message.");
            return;
        }

        const data = await API.call(
            "post",
            "users/discussions",
            { content: messageText, receiver_id: otherUser.id },
            true
        );

        goToDiscussion(data.discussion.id);
    };

    return (
        <AppLayout>
            <BasicTopBar title={"Send a message"} />
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image
                        source={{ uri: otherUser.profile_picture_url }}
                        style={styles.avatar}
                    />
                    <View style={styles.info}>
                        <Text style={styles.username}>
                            @{otherUser.username}
                        </Text>
                        <Text style={styles.joined}>
                            Joined {otherUser.formatted_created_at}
                        </Text>
                        <View style={styles.statsRow}>
                            <Text style={styles.stat}>
                                <Text style={styles.bold}>
                                    {followings.length}
                                </Text>{" "}
                                followings
                            </Text>
                            <Text style={styles.stat}>
                                <Text style={styles.bold}>
                                    {followers.length}
                                </Text>{" "}
                                followers
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.separator} />

                <Text style={styles.label}>Your message :</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={5}
                    placeholder="Share your thoughts..."
                    value={messageText}
                    onChangeText={setMessageText}
                />

                <TouchableOpacity style={styles.button} onPress={sendMessage}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
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
    profile: {
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 6,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 16,
        flex: 1,
    },
    button: {
        backgroundColor: "#555",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    info: {
        alignItems: "center",
    },
    username: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    joined: {
        color: "#666",
        fontSize: 12,
        marginVertical: 2,
        textAlign: "center",
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 8,
    },
    stat: {
        fontSize: 13,
        color: "#666",
    },
    bold: {
        fontWeight: "bold",
        color: "#333",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 12,
    },
});
