import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useMovies } from "../context/MovieContext";
import formatDate from "../helpers/formatDateHelper";

const ReviewItem = ({ review, onPress }) => {
    const { movies } = useMovies();
    const movie = movies.find((m) => m.id == review.movie_id);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(review.id)}
        >
            <View style={styles.topSection}>
                <View style={styles.leftColumn}>
                    <View style={styles.userInfoRow}>
                        <View style={styles.avatar} />
                        <View style={styles.userText}>
                            <Text style={styles.username}>
                                @{review.user.username}
                            </Text>
                            <Text style={styles.date}>
                                {formatDate(review.created_at)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.reviewInfo}>
                        <Text style={styles.movieTitle}>
                            {movie?.title}{" "}
                            <Text style={styles.year}>
                                ({movie?.release_date?.slice(0, 4)})
                            </Text>
                        </Text>
                        <Text style={styles.stars}>★★★</Text>
                    </View>
                </View>

                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w154${movie.poster_url}`,
                    }}
                    style={styles.poster}
                />
            </View>

            <View style={styles.reviewBox}>
                <Text style={styles.reviewText} numberOfLines={3}>
                    {review.content}
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>💬 12</Text>
                <Text style={styles.footerText}>🤍 0</Text>
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
    reviewInfo: {
        marginTop: 4,
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
    poster: {
        width: 80,
        height: 120,
        backgroundColor: "#ddd",
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
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    footerText: {
        fontSize: 14,
        color: "#555",
    },
});

export default ReviewItem;
