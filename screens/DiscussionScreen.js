import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
} from "react-native";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";
import { Ionicons } from "@expo/vector-icons";
import MessageItem from "../components/MessageItem";
import UserTopbar from "../components/Bars/UserTopBar";
import { styles } from "../styles/Discussion.styles";

export default function DiscussionScreen({ route }) {
    const { discussionId } = route.params;
    const { loggedUser } = useAuth();

    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [hasBlocked, setHasBlocked] = useState(false);

    const fetchMessages = async (pageToLoad = 1) => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const data = await API.call(
                "get",
                `users/discussions/${discussionId}/messages?page=${pageToLoad}`,
                {},
                true
            );

            const newMessages = data.messages.data;

            if (pageToLoad === 1) {
                setMessages(newMessages);
                setOtherUser(data.other_user);
                setIsBlocked(data.isBlocked);
                setHasBlocked(data.hasBlocked);
            } else {
                setMessages((prev) => [...prev, ...newMessages]);
            }

            setHasMore(data.messages.next_page_url !== null);
            setPage(pageToLoad + 1);
        } catch (error) {
            console.error("Erreur lors du chargement des messages :", error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await API.call(
                "post",
                `users/discussions/${discussionId}/messages`,
                { content: newMessage },
                true
            );

            const message = response.message;
            setMessages((prev) => [message, ...prev]);
            setNewMessage("");
        } catch (error) {
            console.error("Erreur lors de l’envoi du message :", error);
        }
    };

    useEffect(() => {
        if (discussionId) fetchMessages(1);
    }, [discussionId]);

    const handleLoadMore = () => {
        fetchMessages(page);
    };

    return (
        <AppLayout>
            <UserTopbar otherUser={otherUser} />
            {messages.length > 0 ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={messages}
                    renderItem={({ item }) => (
                        <MessageItem
                            message={item}
                            currentUserId={loggedUser.id}
                            onDelete={(id) =>
                                setMessages((prev) =>
                                    prev.filter((m) => m.id !== id)
                                )
                            }
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingVertical: 12 }}
                    inverted={true}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.3}
                />
            ) : (
                <View style={styles.noMessages}>
                    <Text style={styles.noMessagesText}>
                        No messages yet...
                    </Text>
                </View>
            )}

            {isBlocked || hasBlocked ? (
                <View style={styles.centered}>
                    <Text style={styles.blockedText}>
                        You can't send messages to this user.
                    </Text>
                </View>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Write a message..."
                        multiline
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        style={styles.sendButton}
                    >
                        <Ionicons name="send" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            )}
        </AppLayout>
    );
}
