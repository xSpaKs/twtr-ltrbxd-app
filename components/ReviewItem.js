import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useMovies } from "../context/MovieContext";
import formatDate from "../helpers/formatDate.helper";
import StarRatingDisplay from "./StarRatingDisplay";
import { reviewFormatDate } from "../helpers/reviewFormatDate.helper";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import {
    goToProfile,
    goToReviewDetail,
    goToMovieDetail,
    goToAddReply,
} from "../helpers/navigation.helper";
import { useApi } from "../api/useApi";

const ReviewItem = ({ review, linesLimit = 999 }) => {
    const reviewId = review.id;
    const { loggedUser } = useAuth();
    const { movies } = useMovies();
    const movie = movies.find((m) => m.id == review.movie_id);
    const [isLiked, setIsLiked] = useState(() => {
        return (
            review.likes?.some((like) => like.user_id === loggedUser.id) ||
            false
        );
    });
    const [likesCount, setLikesCount] = useState(review.likes?.length || 0);
    const [repliesCount, setRepliesCount] = useState(
        review.replies?.length || 0
    );
    const [isLoading, setIsLoading] = useState(false);
    const { call } = useApi();

    const handleLike = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const data = await call(
                "post",
                `reviews/${reviewId}/toggle-review-like`,
                {},
                true
            );

            setIsLiked(data.user_has_liked);
            setLikesCount(data.likes_count);
        } catch (error) {
            Alert.alert(
                "Erreur",
                "Impossible de liker cette review. Veuillez réessayer.",
                [{ text: "OK" }]
            );
            console.error("Erreur like:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!movie) {
        return null;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                goToReviewDetail(review.id);
            }}
        >
            <View style={styles.topSection}>
                <View style={styles.leftColumn}>
                    <TouchableOpacity
                        onPress={() => {
                            goToProfile(review.user.id);
                        }}
                    >
                        <View style={styles.userInfoRow}>
                            <Image
                                source={{
                                    uri: review.user.profile_picture_url,
                                }}
                                style={styles.avatar}
                            />
                            <View style={styles.userText}>
                                <Text style={styles.username}>
                                    @{review.user.username}
                                </Text>
                                <Text style={styles.date}>
                                    {formatDate(review.created_at)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.reviewInfo}>
                        <TouchableOpacity
                            onPress={() => goToMovieDetail(review.movie.id)}
                        >
                            <Text style={styles.movieTitle}>
                                {movie?.title}{" "}
                                <Text style={styles.year}>
                                    ({movie?.release_date?.slice(0, 4)})
                                </Text>
                            </Text>
                        </TouchableOpacity>

                        <StarRatingDisplay
                            rating={review.rating}
                            showNumber={false}
                        />
                        <Text style={styles.watchDate}>
                            Watched {reviewFormatDate(review.watch_date)}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => goToMovieDetail(review.movie.id)}
                >
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w154${movie.poster_url}`,
                        }}
                        style={styles.poster}
                    />
                </TouchableOpacity>
            </View>

            {review.content && (
                <View style={styles.reviewBox}>
                    <Text style={styles.reviewText} numberOfLines={linesLimit}>
                        {review.content}
                    </Text>
                </View>
            )}

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
                    onPress={() => {
                        goToAddReply("review", review);
                    }}
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
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "white",
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftColumn: {
        flex: 1,
        marginRight: 12,
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
        backgroundColor: "white",
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
    reviewInfo: {
        marginTop: 4,
        gap: 4,
    },
    movieTitle: {
        paddingTop: 12,
        fontWeight: "bold",
        fontSize: 16,
    },
    year: {
        fontSize: 14,
        color: "#666",
    },
    stars: {
        fontSize: 16,
        marginTop: 4,
    },
    watchDate: {
        color: "#666",
    },
    poster: {
        width: 85,
        height: 120,
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    reviewBox: {
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    reviewText: {
        fontSize: 14,
        color: "#333",
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
        color: "#E50914",
    },
    actionsRow: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default ReviewItem;
