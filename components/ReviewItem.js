import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ReviewItem = ({ review, onPress }) => {
    const formatPostDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = Math.max(0, now - date);

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return `${seconds}s`;
        }

        if (minutes < 60) {
            return `${minutes}m`;
        }

        if (hours < 24) {
            return `${hours}h`;
        }

        if (days < 7) {
            return `il y a ${days} jour${days > 1 ? "s" : ""}`;
        }

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hour}h${minute}`;
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(review.id)}
        >
            <View style={styles.headerRow}>
                <Text style={styles.username}>@{review.user.username}</Text>
                <Text style={styles.date}>
                    {formatPostDate(review.created_at)}
                </Text>
            </View>
            <Text style={styles.content}>{review.title}</Text>
            <Text style={styles.content}>{review.body}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    date: {
        fontSize: 14,
        color: "#888",
    },
    content: {
        marginTop: 6,
        fontSize: 15,
        color: "#000",
    },
});

export default ReviewItem;
