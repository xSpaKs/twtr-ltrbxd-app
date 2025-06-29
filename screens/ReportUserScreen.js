import API from "../api/API";
import BasicTopBar from "../components/Bars/BasicTopBar";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
    Modal,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { goToTimeline } from "../helpers/navigation.helper";
import { styles } from "../styles/ReportUser.styles";

const ReportUserScreen = ({ route }) => {
    const { otherUser } = route.params;

    const [reason, setReason] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

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

export default ReportUserScreen;
