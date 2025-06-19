import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";
import { Ionicons } from "@expo/vector-icons";
import MessageItem from "../components/MessageItem";

export default function DiscussionScreen({ route }) {
    const { discussionId } = route.params;
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const navigation = useNavigation();

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

    const toggleBlock = async () => {
        try {
            const data = await API.call(
                "post",
                `users/${otherUser.id}/toggle-block`,
                {},
                true
            );
            setIsBlocked(data.isBlocked);
        } catch (e) {
            console.error("Erreur lors du blocage/déblocage", e);
        }
    };

    const goToProfile = () => {
        navigation.navigate("Profile", { id: otherUser.id });
    };

    useEffect(() => {
        if (discussionId) fetchMessages(1);
    }, [discussionId]);

    const handleLoadMore = () => {
        fetchMessages(page);
    };

    return (
        <AppLayout>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToProfile}>
                    <View style={styles.headerLeft}>
                        {otherUser && (
                            <>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={styles.backIcon}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                                <Image
                                    source={{
                                        uri: otherUser.profile_picture_url,
                                    }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.headerUsername}>
                                    @{otherUser.username}
                                </Text>
                            </>
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowOptions(true)}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={22}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={messages}
                renderItem={({ item }) => (
                    <MessageItem
                        message={item}
                        currentUserId={user.id}
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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Écris un message..."
                    multiline
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    style={styles.sendButton}
                >
                    <Ionicons name="send" size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>
            <Modal
                visible={showOptions}
                transparent
                animationType="fade"
                onRequestClose={() => setShowOptions(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowOptions(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={toggleBlock}
                            style={styles.menuItem}
                        >
                            <Text>Block</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.menuItem}
                        >
                            <Text>Report</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 8,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        maxHeight: 100,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#f4f4f4",
        borderRadius: 20,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        padding: 6,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    headerUsername: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#333",
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#ccc",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 40,
        paddingRight: 12,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 6,
        width: 160,
        elevation: 5,
        paddingVertical: 8,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    blockedText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginTop: 40,
    },
    backIcon: {
        padding: 4,
        marginRight: 6,
    },
});
