import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const PostItem = ({ post, navigation }) => {
    const postId = post.id;
    const profileId = post.user.id;

    const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [isLoading, setIsLoading] = useState(false);

    const formatPostDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = Math.max(0, now - date);

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return `il y a ${seconds}s`;
        }

        if (minutes < 60) {
            return `il y a ${minutes}m`;
        }

        if (hours < 24) {
            return `il y a ${hours}h`;
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

    const handleLike = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const response = await API.call(
                "post",
                `posts/${postId}/toggle-like`,
                { postId: postId },
                true
            );

            if (!response.ok) {
                throw new Error("Erreur lors du like");
            }

            const data = await response.json();

            setIsLiked(data.user_has_liked);
            setLikesCount(data.likes_count);
        } catch (error) {
            Alert.alert(
                "Erreur",
                "Impossible de liker ce post. Veuillez réessayer.",
                [{ text: "OK" }]
            );
            console.error("Erreur like:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const goToProfile = () => {
        navigation.navigate("Profile", { id: profileId });
    };

    const goToPostDetail = () => {
        navigation.navigate("Post", { postId });
    };

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.headerRow}>
                <Text onPress={goToProfile} style={styles.username}>
                    @{post.user.username}
                </Text>
                <Text onPress={goToPostDetail} style={styles.date}>
                    {formatPostDate(post.created_at)}
                </Text>
            </View>
            <Text onPress={goToPostDetail} style={styles.content}>
                {post.content}
            </Text>
            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={styles.likeButton}
                    onPress={handleLike}
                    disabled={isLoading}
                >
                    <Text
                        style={[styles.likeIcon, isLiked && styles.likedIcon]}
                    >
                        {isLiked ? "❤️" : "🤍"}
                    </Text>
                    <Text
                        style={[styles.likeCount, isLiked && styles.likedText]}
                    >
                        {likesCount}
                    </Text>
                </TouchableOpacity>
            </View>
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

export default PostItem;
