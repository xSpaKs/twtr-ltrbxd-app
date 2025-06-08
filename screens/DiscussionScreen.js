import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import API from "../api/API";
import useAuth from "../context/AuthContext";
import AppLayout from "../components/AppLayout";

export default function MessageScreen() {
    const route = useRoute();
    const { discussionId } = route.params;
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await API.call(
                    "get",
                    `discussions/${discussionId}/messages`,
                    {},
                    true
                );
                const sorted = fetchedMessages.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
                setMessages(sorted);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des messages :",
                    error
                );
            }
        };

        if (discussionId) fetchMessages();
    }, [discussionId]);

    const renderItem = ({ item }) => {
        const isSentByCurrentUser = item.sender_id === user.id;
        return (
            <View
                style={[
                    styles.messageContainer,
                    isSentByCurrentUser ? styles.sent : styles.received,
                ]}
            >
                <Text style={styles.messageText}>{item.content}</Text>
                <Text style={styles.messageDate}>
                    {new Date(item.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </View>
        );
    };

    return (
        <AppLayout>
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <MessageItem message={item} currentUserId={user.id} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingVertical: 12 }}
                />
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "#f4f4f4",
    },
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
