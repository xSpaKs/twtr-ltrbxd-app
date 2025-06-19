import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import API from "../api/API";

export default function MessageItem({ message, currentUserId, onDelete }) {
    const isSentByCurrentUser = message.sender_id === currentUserId;

    const handleLongPress = () => {
        Alert.alert(
            "Supprimer le message",
            "Es-tu sûr de vouloir supprimer ce message ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await API.call(
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
                <Text style={styles.messageText}>{message.content}</Text>
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
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-end",
        marginRight: 8,
    },
    received: {
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
        marginLeft: 8,
    },
    messageText: {
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
