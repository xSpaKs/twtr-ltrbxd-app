import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import formatDate from "../helpers/formatDateHelper";
import PostMovieItem from "./PostMovieItem";
import { useMovies } from "../context/MovieContext";

const PostItem = ({ post, navigation }) => {
    const postId = post.id;
    const profileId = post.user.id;
    let movie = null;

    const [isLiked, setIsLiked] = useState(post.user_has_liked || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [isLoading, setIsLoading] = useState(false);

    if (post.movie_id != null) {
        const { movies } = useMovies();
        movie = movies.find((m) => m.id == post.movie_id);
    }

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
            <TouchableOpacity onPress={goToProfile}>
                <View style={styles.userInfoRow}>
                    <Image
                        source={{ uri: post.user.profile_picture_url }}
                        style={styles.avatar}
                    />
                    <View style={styles.userText}>
                        <Text style={styles.username}>
                            @{post.user.username}
                        </Text>
                        <Text style={styles.date}>
                            {formatDate(post.created_at)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Text
                onPress={goToPostDetail}
                style={styles.content}
                numberOfLines={6}
            >
                {post.content}
            </Text>
            {movie && <PostMovieItem movie={movie}></PostMovieItem>}
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
    userInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ccc",
        marginRight: 10,
    },
    userText: {
        justifyContent: "center",
        gap: 4,
    },
    username: {
        fontWeight: "bold",
        fontSize: 15,
    },
    date: {
        fontSize: 13,
        color: "#888",
    },
    content: {
        marginTop: 6,
        fontSize: 15,
        color: "#000",
    },
});

export default PostItem;
