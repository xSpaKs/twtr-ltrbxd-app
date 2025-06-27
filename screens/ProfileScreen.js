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
import ProfileTabs from "../components/Tabs/ProfileTabs";
import {
    goToEditProfile,
    goToDiscussion,
    goToSendMessage,
    goToReport,
} from "../helpers/navigation.helper";

export default function ProfileScreen({ route }) {
    const { id } = route.params;
    const [userProfile, setUserProfile] = useState(null);
    const { loggedUser, logoutContext } = useAuth();
    const isOwnUser = id == loggedUser.id;
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [hasBlocked, setHasBlocked] = useState(false);
    const [sharedDiscussion, setSharedDiscussion] = useState([]);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            let data = await API.call("get", `users/${id}`, {}, true);
            setUserProfile(data.user);
            setIsBlocked(data.isBlockedByMe);
            setHasBlocked(data.hasBlockedMe);
            setFollowers(data.followers);
            setIsFollowed(data.followers.some((f) => f.id === loggedUser.id));
            setFollowings(data.followings);
            setSharedDiscussion(data.sharedDiscussion);
        } catch (e) {
            console.error("Erreur de chargement du profil :", e);
        }
    };

    const handleLogout = async () => {
        await API.call("post", "logout", {}, true);
        logoutContext();
    };

    const toggleFollow = async () => {
        try {
            const data = await API.call(
                "post",
                `users/${id}/toggle-follow`,
                {},
                true
            );

            setIsFollowed(data.isFollowed);
        } catch (e) {
            console.error("Erreur lors du follow/unfollow", e);
        }
    };

    const toggleBlock = async () => {
        try {
            await API.call("post", `users/${id}/toggle-block`, {}, true);
            await fetchUser();
        } catch (e) {
            console.error("Erreur lors du blocage/déblocage", e);
        }
    };

    const handleDiscussion = () => {
        if (sharedDiscussion["value"] == true) {
            goToDiscussion(sharedDiscussion["id"]);
        }
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
                            followings
                        </Text>
                        <Text style={styles.stat}>
                            <Text style={styles.bold}>{followers.length}</Text>{" "}
                            followers
                        </Text>
                    </View>
                </View>
                <View style={styles.headerRightButtons}>
                    {!isOwnUser && !isBlocked && !hasBlocked && (
                        <TouchableOpacity
                            style={
                                isFollowed
                                    ? styles.followButton
                                    : styles.noFollowButton
                            }
                            onPress={toggleFollow}
                        >
                            <Text
                                style={
                                    isFollowed
                                        ? styles.followButtonText
                                        : styles.noFollowButtonText
                                }
                            >
                                {isFollowed ? "Following" : "Follow"}
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
                        {isBlocked
                            ? "You have blocked this user."
                            : "You have been blocked by this user."}
                    </Text>
                </View>
            ) : (
                <ProfileTabs user={userProfile} />
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
                                {!isBlocked && (
                                    <TouchableOpacity
                                        onPress={
                                            sharedDiscussion["value"] == true
                                                ? handleDiscussion
                                                : () =>
                                                      goToSendMessage(
                                                          userProfile,
                                                          followings,
                                                          followers
                                                      )
                                        }
                                        style={styles.menuItem}
                                    >
                                        <Text>Send a message</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={toggleBlock}
                                    style={styles.menuItem}
                                >
                                    {isBlocked ? (
                                        <Text>Unblock</Text>
                                    ) : (
                                        <Text>Block</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => goToReport(userProfile)}
                                    style={styles.menuItem}
                                >
                                    <Text>Report</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {isOwnUser && (
                            <>
                                <TouchableOpacity
                                    onPress={() => goToEditProfile(userProfile)}
                                    style={styles.menuItem}
                                >
                                    <Ionicons
                                        name="pencil-sharp"
                                        size={16}
                                    ></Ionicons>
                                    <Text>Edit profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleLogout}
                                    style={styles.menuItem}
                                >
                                    <Ionicons
                                        name="log-out-outline"
                                        size={20}
                                    ></Ionicons>
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
        borderColor: "#333",
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
        minWidth: 70,
    },
    followButtonText: {
        color: "#333",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
    noFollowButton: {
        backgroundColor: "#333",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
        minWidth: 70,
    },
    noFollowButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
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
        justifyContent: "center",
        alignItems: "center",
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
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    blockedText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginTop: 40,
    },
});
