import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "../api/useApi";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../components/AppLayout";
import ProfileTabs from "../components/Tabs/ProfileTabs";
import {
    goToEditProfile,
    goToDiscussion,
    goToSendMessage,
    goToReport,
} from "../helpers/navigation.helper";
import { styles } from "../styles/Profile.styles";

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
    const { call } = useApi();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            let data = await call("get", `users/${id}`, {}, true);
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
        await call("post", "logout", {}, true);
        logoutContext();
    };

    const toggleFollow = async () => {
        try {
            const data = await call(
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
            await call("post", `users/${id}/toggle-block`, {}, true);
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
        <AppLayout color={"#1C1C1E"}>
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
                            color="white"
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
