import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Image,
    ScrollView,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { useMovies } from "../context/MovieContext";
import { useRoute } from "@react-navigation/native";

export default function AddReviewScreen() {
    const route = useRoute();
    const { movieId } = route.params;
    const { movies } = useMovies();
    const navigation = useNavigation();

    const [reviewText, setReviewText] = useState("C'était un super film");
    const [rating, setRating] = useState("8.5");
    const [watchDate, setWatchDate] = useState("2025-06-10");

    const movie = movies.find((m) => m.id == movieId);

    const handleSubmit = async () => {
        if (!rating || isNaN(rating)) return alert("Note invalide.");
        if (!watchDate.trim()) return alert("Date de visionnage requise.");

        await API.call(
            "post",
            "reviews",
            {
                movieId: movieId,
                content: reviewText,
                rating: parseFloat(rating),
                watchDate: watchDate,
            },
            true
        );

        alert("Review publiée !");
        navigation.navigate("Timeline", { refresh: true });
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

    return (
        <AppLayout>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    {movie.poster_url && (
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w185${movie.poster_url}`,
                            }}
                            style={styles.poster}
                        />
                    )}

                    <Text style={styles.label}>
                        Date de visionnage (YYYY-MM-DD) :
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="2025-06-10"
                        value={watchDate}
                        onChangeText={setWatchDate}
                    />

                    <Text style={styles.label}>Note (sur 10) :</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="8.5"
                        keyboardType="numeric"
                        value={rating}
                        onChangeText={setRating}
                    />

                    <Text style={styles.label}>Contenu de la review :</Text>
                    <TextInput
                        style={styles.textAreaLarge}
                        multiline
                        numberOfLines={10}
                        placeholder="Exprime-toi longuement sur ce film..."
                        value={reviewText}
                        onChangeText={setReviewText}
                    />

                    <Button title="Publier" onPress={handleSubmit} />
                </View>
            </ScrollView>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    movieTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
    },
    poster: {
        width: 120,
        height: 180,
        resizeMode: "cover",
        marginBottom: 16,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
    },
    textAreaLarge: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
        height: 180, // ou + si tu veux encore plus haut
        fontSize: 16, // texte plus lisible
    },
});
