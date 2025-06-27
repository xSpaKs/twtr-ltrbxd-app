import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import formatDate from "../helpers/formatDate.helper";
import PostMovieItem from "./PostMovieItem";
import { useMovies } from "../context/MovieContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import API from "../api/API";
import { useAuth } from "../context/AuthContext";
import {
    goToProfile,
    goToPostDetail,
    goToAddReply,
} from "../helpers/navigation.helper";

const PostItem = ({ post, type = "detail", linesLimit = 999 }) => {
    const postId = post.id;
    const profileId = post.user.id;
    const { loggedUser } = useAuth();
    let movie = null;

    const [isLiked, setIsLiked] = useState(() => {
        return (
            post.likes?.some((like) => like.user_id === loggedUser.id) || false
        );
    });
    const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
    const [repliesCount, setRepliesCount] = useState(post.replies?.length || 0);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    if (post.movie_id != null) {
        const { movies } = useMovies();
        movie = movies.find((m) => m.id == post.movie_id);
    }

    const handleLike = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const data = await API.call(
                "post",
                `posts/${postId}/toggle-post-like`,
                {},
                true
            );

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

    return (
        <TouchableOpacity style={styles.container}>
            <TouchableOpacity onPress={() => goToProfile(profileId)}>
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
            {(post.parent_post || post.parent_review) && (
                <TouchableOpacity
                    onPress={() => {
                        goToProfile(post.parent_post.user.id);
                    }}
                >
                    <Text style={styles.answerText}>
                        Answering to @
                        {post.parent_post
                            ? post.parent_post.user.username
                            : post.parent_review.user.username}
                    </Text>
                </TouchableOpacity>
            )}

            <Text
                onPress={() => goToPostDetail(post.id)}
                style={styles.content}
                numberOfLines={linesLimit}
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
                    <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={20}
                        style={[styles.likeIcon, isLiked && styles.likedIcon]}
                    />
                    <Text
                        style={[styles.likeCount, isLiked && styles.likedText]}
                    >
                        {likesCount}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => goToAddReply("post", post)}
                    disabled={isLoading}
                >
                    <Ionicons
                        name={"chatbox-outline"}
                        size={20}
                        style={styles.likeIcon}
                    />
                    <Text style={styles.likedText}>{repliesCount}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
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
    likeButton: {
        display: "flex",
        flexDirection: "row",
    },
    likeIcon: {
        marginRight: 6,
        color: "gray",
    },
    likedIcon: {
        color: "red",
    },
    actionsRow: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    answerText: {
        fontSize: 12,
        color: "#666",
    },
});

export default PostItem;
