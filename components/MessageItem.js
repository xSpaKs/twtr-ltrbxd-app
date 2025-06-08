import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageItem({ message, currentUserId }) {
    const isSentByCurrentUser = message.sender_id === currentUserId;

    return (
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
    },
    received: {
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
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
