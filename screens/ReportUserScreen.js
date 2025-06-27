import API from "../api/API";
import BasicTopBar from "../components/Bars/BasicTopBar";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
    ScrollView,
    Modal,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { goToTimeline } from "../helpers/navigation.helper";

const ReportUserScreen = ({ route }) => {
    const { loggedUser } = useAuth();
    const { otherUser } = route.params;

    const [reason, setReason] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await API.call(
                    "get",
                    `users/${otherUser.id}/timeline/posts`,
                    {},
                    true
                );
                setPosts(res.data);
            } catch (err) {
                console.error("Erreur chargement posts :", err);
            }
        };
        fetchPosts();
    }, []);

    const handleSubmit = async () => {
        if (!reason.trim()) {
            Alert.alert("Erreur", "Merci d’indiquer une raison.");
            return;
        }
        try {
            setLoading(true);
            await API.call(
                "post",
                "users/report",
                {
                    reported_id: otherUser.id,
                    reason: reason.trim(),
                    post_id: selectedPostId,
                },
                true
            );
            Alert.alert(
                "Thanks",
                "The report has been received. We will examinate it as soon as possible."
            );
            setReason("");
            setSelectedPostId(null);
            goToTimeline();
        } catch (error) {
            console.error("Erreur report :", error);
            Alert.alert("Erreur", "Impossible d’envoyer le signalement.");
        } finally {
            setLoading(false);
        }
    };

    const removePost = () => {
        setSelectedPostId(null);
    };

    return (
        <AppLayout>
            <BasicTopBar title={"Report a user"} />
            <View style={styles.profile}>
                <Image
                    source={{ uri: otherUser.profile_picture_url }}
                    style={styles.avatar}
                />
                <View style={styles.info}>
                    <Text style={styles.username}>@{otherUser.username}</Text>
                    <Text style={styles.joined}>
                        Joined {otherUser.formatted_created_at}
                    </Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.stat}>
                            <Text style={styles.bold}>
                                {otherUser.followings.length}
                            </Text>{" "}
                            followings
                        </Text>
                        <Text style={styles.stat}>
                            <Text style={styles.bold}>
                                {otherUser.followers.length}
                            </Text>{" "}
                            followers
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                {selectedPostId && (
                    <View style={styles.selectedPost}>
                        <Text style={styles.selectedPreview}>
                            {posts
                                .find((p) => p.id === selectedPostId)
                                ?.content?.slice(0, 50)}
                            ...
                        </Text>
                        <TouchableOpacity onPress={removePost}>
                            <Ionicons name="close-outline" size={16} />
                        </TouchableOpacity>
                    </View>
                )}
                {!selectedPostId && (
                    <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.selectButtonText}>
                            Link a post (optional)
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.section}>
                <TextInput
                    style={styles.textArea}
                    multiline
                    value={reason}
                    onChangeText={setReason}
                    placeholder="Describe the reason of the report (out of context post, harassing, spam, inappropriate content...)"
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    (!reason.trim() || loading) && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!reason.trim() || loading}
            >
                <Text style={styles.submitText}>
                    {loading
                        ? "Sending report..."
                        : "Report " + otherUser.username}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            Sélectionner un post
                        </Text>
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{
                                gap: 12,
                                paddingHorizontal: 12,
                            }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.modalPostItem,
                                        item.id === selectedPostId &&
                                            styles.modalPostSelected,
                                    ]}
                                    onPress={() => {
                                        setSelectedPostId(item.id);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text
                                        style={styles.postText}
                                        numberOfLines={3}
                                    >
                                        {item.content}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.modalClose}
                        >
                            <Text style={styles.modalCloseText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    profile: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    info: {
        alignItems: "center",
        marginTop: 8,
    },
    username: {
        fontWeight: "600",
        fontSize: 16,
    },
    joined: {
        color: "#666",
        fontSize: 12,
        marginVertical: 2,
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
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    selectButton: {
        backgroundColor: "#000",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    selectButtonText: {
        fontWeight: "500",
        color: "#fff",
    },
    selectedPreview: {
        fontSize: 12,
        color: "#555",
    },
    selectedPost: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 12,
        padding: 16,
        maxHeight: "60%",
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    modalPostItem: {
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 10,
        minHeight: 60,
        justifyContent: "center",
    },
    modalPostSelected: {
        backgroundColor: "#e0f0ff",
        borderWidth: 2,
        borderColor: "#007AFF",
    },
    modalClose: {
        marginTop: 16,
        alignItems: "center",
    },
    modalCloseText: {
        color: "#007AFF",
        fontWeight: "600",
    },
    textArea: {
        minHeight: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: "top",
        backgroundColor: "#fff",
    },
    submitButton: {
        marginTop: 24,
        backgroundColor: "#007AFF",
        padding: 14,
        marginHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    submitText: {
        color: "#fff",
        fontWeight: "600",
    },
});

export default ReportUserScreen;
