import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useNavigation } from "@react-navigation/native";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { useMovies } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { goToMovieDetail, goToTimeline } from "../../helpers/navigation.helper";

export default function AddPostScreen({ route }) {
    const { movieId: initialMovieId } = route.params;
    const [movieId, setMovieId] = useState(initialMovieId ?? null);
    const [movie, setMovie] = useState(null);
    const { loggedUser } = useAuth();

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
        goToTimeline({ refresh: true });
    };

    const removeMovie = () => {
        setMovieId(null);
    };

    const handleMovieDetail = () => {
        if (movieId) {
            goToMovieDetail(movieId);
        }
    };

    return (
        <AppLayout>
            <BasicTopBar title={"Publish a post"} />
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: loggedUser.profile_picture_url }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>@{loggedUser.username}</Text>
                </View>
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
                        <TouchableOpacity onPress={handleMovieDetail}>
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
                        onPress={() => goToSearchMovie("AddPost")}
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
