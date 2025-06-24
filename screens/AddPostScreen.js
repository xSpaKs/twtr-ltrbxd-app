import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Image,
    ActivityIndicator,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useNavigation } from "@react-navigation/native";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { useMovies } from "../context/MovieContext";

export default function AddPostScreen({ route }) {
    const { movieId: initialMovieId } = route.params;
    const [movieId, setMovieId] = useState(initialMovieId ?? null);
    const [movie, setMovie] = useState(null);

    const { movies } = useMovies();
    const [postText, setPostText] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        if (movieId) {
            setMovie(movies.find((m) => m.id == movieId));
        } else {
            setMovie(null);
        }
    }, [movieId]);

    const publishPost = async () => {
        if (!postText.trim()) {
            alert("Veuillez écrire un post.");
            return;
        }

        await API.call(
            "post",
            "posts",
            { content: postText, movie_id: movieId ?? null },
            true
        );

        alert("Post publié !");
        navigation.navigate("Timeline", { refresh: true });
    };

    const removeMovie = () => {
        setMovieId(null);
    };

    const goToSearchMovie = () => {
        navigation.navigate("SearchMovie", { nextUrl: "AddPost" });
    };

    const goToMovieDetail = () => {
        if (movieId) {
            navigation.navigate("Movie", { movieId: movieId });
        }
    };

    return (
        <AppLayout>
            <BasicTopBar title={"Publish a post"} />
            <View style={styles.container}>
                <Text style={styles.label}>Your message :</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={5}
                    placeholder="Share your thoughts..."
                    value={postText}
                    onChangeText={setPostText}
                />
                {movie ? (
                    <View style={styles.movieBox}>
                        <TouchableOpacity onPress={goToMovieDetail}>
                            <View style={styles.movieTextContainer}>
                                <Text style={styles.movieTitle}>
                                    {movie.title}
                                </Text>
                                <Text style={styles.movieDate}>
                                    {movie.release_date?.slice(0, 4) ?? "N/A"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={removeMovie}>
                            <Text style={styles.removeButton}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.selectMovieButton}
                        onPress={goToSearchMovie}
                    >
                        <Text style={styles.selectMovieText}>
                            ＋ Link a movie (optional)
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.button} onPress={publishPost}>
                    <Text style={styles.buttonText}>Publish</Text>
                </TouchableOpacity>
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    movieBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginBottom: 16,
    },
    movieTextContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    movieDate: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    removeButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: "#aa0000",
    },
    selectMovieButton: {
        backgroundColor: "#eeeeee",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    selectMovieText: {
        color: "#333",
        fontWeight: "500",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 6,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
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
