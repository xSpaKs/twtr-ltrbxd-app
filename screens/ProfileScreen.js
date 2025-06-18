import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";
import ProfileTabs from "../components/ProfileTabs";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ route }) {
    const { id } = route.params;
    const [userProfile, setUserProfile] = useState(null);
    const { user, logoutContext } = useAuth();
    const isOwnUser = id == user.id;
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [hasBlocked, setHasBlocked] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let data;
                if (isOwnUser) {
                    data = await API.call("get", `users/me`, {}, true);
                } else {
                    data = await API.call("get", `users/${id}`, {}, true);
                }
                setUserProfile(data.user);
            } catch (e) {
                console.error("Erreur de chargement du profil :", e);
            }
        };

        const fetchFollowers = async () => {
            try {
                const data = await API.call(
                    "get",
                    `users/${id}/followers`,
                    {},
                    true
                );
                setFollowers(data.followers);
                setIsFollowing(data.followers.some((f) => f.id === user.id));
            } catch (e) {
                console.error("Erreur de chargement du profil :", e);
            }
        };

        const fetchFollowings = async () => {
            try {
                const data = await API.call(
                    "get",
                    `users/${id}/followings`,
                    {},
                    true
                );
                setFollowings(data.followings);
            } catch (e) {
                console.error("Erreur de chargement du profil :", e);
            }
        };

        const fetchBlocks = async () => {
            const data = await API.call(
                "get",
                `users/${id}/followings`,
                {},
                true
            );
            setIsBlocked(data.isBlocked);
            setHasBlocked(data.hasBlocked);
        };
        fetchUser();
        fetchFollowers();
        fetchFollowings();

        if (!isOwnUser) {
            fetchBlocks();
        }
    }, [id]);

    const handleLogout = async () => {
        await API.call("post", "logout", {}, true);
        logoutContext();
    };

    const toggleFollow = async () => {
        try {
            if (isFollowing) {
                await API.call("post", `users/${id}/unfollow`, {}, true);
            } else {
                await API.call("post", `users/${id}/follow`, {}, true);
            }
            setIsFollowing(!isFollowing);
        } catch (e) {
            console.error("Erreur lors du follow/unfollow", e);
        }
    };

    const toggleBlock = async () => {
        try {
            const data = await API.call(
                "post",
                `users/${id}/toggle-block`,
                {},
                true
            );
            setIsBlocked(data.isBlocked);
        } catch (e) {
            console.error("Erreur lors du blocage/déblocage", e);
        }
    };

    const goToEditProfile = () => {
        navigation.navigate("EditProfile", { user: userProfile });
    };

    if (!userProfile) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AppLayout>
            <View style={styles.header}>
                <Image
                    source={{ uri: userProfile.profile_picture_url }}
                    style={styles.avatar}
                />
                <View style={styles.info}>
                    <Text style={styles.username}>@{userProfile.username}</Text>
                    <Text style={styles.joined}>
                        Joined {userProfile.formatted_created_at}
                    </Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.stat}>
                            <Text style={styles.bold}>{followings.length}</Text>{" "}
                            abonnements
                        </Text>
                        <Text style={styles.stat}>
                            <Text style={styles.bold}>{followers.length}</Text>{" "}
                            abonnés
                        </Text>
                    </View>
                </View>
                <View style={styles.headerRightButtons}>
                    {!isOwnUser && (
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={toggleFollow}
                        >
                            <Text style={styles.followButtonText}>
                                {isFollowing ? "Suivi" : "Suivre"}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => setMenuVisible(true)}
                        style={styles.menuButton}
                    >
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={22}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {isBlocked || hasBlocked ? (
                <View style={styles.centered}>
                    <Text style={styles.blockedText}>
                        {hasBlocked
                            ? "Vous avez bloqué cet utilisateur."
                            : "Cet utilisateur vous a bloqué."}
                    </Text>
                </View>
            ) : (
                <ProfileTabs />
            )}

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        {!isOwnUser && (
                            <>
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
                            </>
                        )}
                        {isOwnUser && (
                            <>
                                <TouchableOpacity
                                    onPress={goToEditProfile}
                                    style={styles.menuItem}
                                >
                                    <Text>Edit profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {}}
                                    style={styles.menuItem}
                                >
                                    <Text>Logout</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </Pressable>
            </Modal>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    info: {
        flex: 1,
        marginLeft: 12,
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
    headerRightButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    followButton: {
        backgroundColor: "#333",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
    },
    followButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
    menuButton: {
        padding: 6,
    },
    logoutButton: {
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: "#d9534f",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
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
});
