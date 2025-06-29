import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { goToDiscussion } from "../helpers/navigation.helper";
import { styles } from "../styles/SendMessage.styles";

export default function SendMessageScreen({ route }) {
    const { otherUser, followings, followers } = route.params;
    const [messageText, setMessageText] = useState("");

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
