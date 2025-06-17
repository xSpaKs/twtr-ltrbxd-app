import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMovies } from "../context/MovieContext";
import { Ionicons } from "@expo/vector-icons";

export default function AddReviewScreen() {
    const route = useRoute();
    const { movieId } = route.params;
    const { movies } = useMovies();
    const navigation = useNavigation();

    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(3);
    const [watchDate, setWatchDate] = useState("2025-06-11");

    const movie = movies.find((m) => m.id == movieId);

    const postReview = async () => {
        await API.call(
            "post",
            "reviews",
            {
                movieId: movieId,
                content: reviewText,
                rating: rating,
                watchDate: watchDate,
            },
            true
        );

        alert("Review publiée !");
        navigation.navigate("Timeline", { refresh: true });
    };

    const goToMovieDetail = () => {
        navigation.navigate("Movie", { movieId: movieId });
    };

    const renderStars = () => {
        return (
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity key={i} onPress={() => setRating(i)}>
                        <Ionicons
                            name={i <= rating ? "star" : "star-outline"}
                            size={22}
                            color="black"
                            style={{ marginHorizontal: 2 }}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    if (!movie) {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <Text>Chargement du film...</Text>
                </View>
            </AppLayout>
        );
    }

    const formattedDate = watchDate;

    return (
        <AppLayout>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={goToMovieDetail}>
                        <View style={styles.movieHeader}>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w185${movie.poster_url}`,
                                }}
                                style={styles.poster}
                            />
                            <View style={styles.movieInfo}>
                                <Text style={styles.movieTitle}>
                                    {movie.title}
                                    <Text style={styles.movieYear}>
                                        {" "}
                                        (
                                        {new Date(
                                            movie.release_date
                                        ).getFullYear()}
                                        )
                                    </Text>
                                </Text>
                                <Text
                                    style={styles.movieDescription}
                                    numberOfLines={4}
                                >
                                    {movie.description}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Watch date</Text>
                        <Text>{formattedDate}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Note</Text>
                        {renderStars()}
                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <TextInput
                            style={styles.textArea}
                            multiline
                            numberOfLines={10}
                            placeholder="Write a review..."
                            value={reviewText}
                            onChangeText={setReviewText}
                        />
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={postReview}
                    >
                        <Text style={styles.buttonText}>Publier</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    movieHeader: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
    },
    poster: {
        width: 85,
        height: 120,
        borderRadius: 4,
        backgroundColor: "#933",
    },
    movieInfo: {
        flex: 1,
        marginLeft: 12,
    },
    movieTitle: {
        fontWeight: "bold",
        fontSize: 15,
    },
    movieYear: {
        color: "#888",
        fontWeight: "normal",
    },
    movieDescription: {
        marginTop: 4,
        fontSize: 13,
        color: "#444",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 6,
    },
    starsRow: {
        flexDirection: "row",
        marginBottom: 16,
    },
    textArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top",
        fontSize: 15,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#555",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
