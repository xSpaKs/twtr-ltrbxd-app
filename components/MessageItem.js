import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useApi } from "../api/useApi";

export default function MessageItem({ message, currentUserId, onDelete }) {
    const isSentByCurrentUser = message.sender_id === currentUserId;
    const { call } = useApi();

    const handleLongPress = () => {
        Alert.alert(
            "Delete this message",
            "Are you sure to delete this message ? You can't go back.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await call(
                                "delete",
                                `messages/${message.id}`,
                                {},
                                true
                            );
                            if (onDelete) {
                                onDelete(message.id);
                            }
                        } catch (error) {
                            console.error("Erreur suppression :", error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity
            onLongPress={isSentByCurrentUser ? handleLongPress : undefined}
        >
            <View
                style={[
                    styles.messageContainer,
                    isSentByCurrentUser ? styles.sent : styles.received,
                ]}
            >
                <Text
                    style={[
                        isSentByCurrentUser
                            ? styles.sentText
                            : styles.receivedText,
                    ]}
                >
                    {message.content}
                </Text>
                <Text style={styles.messageDate}>
                    {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: "75%",
        padding: 10,
        borderRadius: 12,
        marginVertical: 6,
    },
    sent: {
        backgroundColor: "#1C1C1E",
        alignSelf: "flex-end",
        marginRight: 8,
    },
    sentText: {
        fontSize: 16,
        color: "white",
    },
    received: {
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
        marginLeft: 8,
    },
    receivedText: {
        fontSize: 16,
        color: "#000",
    },
    messageDate: {
        fontSize: 10,
        color: "#888",
        marginTop: 4,
        textAlign: "right",
    },
});
