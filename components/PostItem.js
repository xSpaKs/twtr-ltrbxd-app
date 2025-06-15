import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import formatDate from "../helpers/formatDateHelper";

const PostItem = ({ post, navigation }) => {
    const postId = post.id;
    const profileId = post.user.id;

    const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [isLoading, setIsLoading] = useState(false);

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
                    {formatDate(post.created_at)}
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
