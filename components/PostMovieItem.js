import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostMovieItem = ({ movie }) => {
    const year = new Date(movie.release_date).getFullYear();

    return (
        <View style={styles.container}>
            <Image source={{ uri: movie.poster_url }} style={styles.poster} />
            <View style={styles.info}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {title} <Text style={styles.year}>({year})</Text>
                    </Text>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>
                            {movie.rating.toFixed(1)}
                        </Text>
                        <Ionicons
                            name="star"
                            size={14}
                            color="black"
                            style={{ marginLeft: 2 }}
                        />
                    </View>
                </View>
                <Text
                    style={styles.description}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                >
                    {movie.description}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#e5e5e5",
        borderRadius: 10,
        padding: 10,
        alignItems: "flex-start",
    },
    poster: {
        width: 50,
        height: 70,
        borderRadius: 4,
        backgroundColor: "#933",
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
    },
    year: {
        fontWeight: "normal",
        color: "#666",
        fontSize: 12,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 13,
        fontWeight: "600",
    },
    description: {
        marginTop: 4,
        fontSize: 13,
        color: "#333",
    },
});

export default PostMovieItem;
