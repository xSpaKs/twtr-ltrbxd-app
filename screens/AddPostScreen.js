import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import AppLayout from "../components/AppLayout";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { useMovies } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import {
    goToTimeline,
    goToMovieDetail,
    goToSearchMovie,
} from "../helpers/navigation.helper";
import { styles } from "../styles/AddPost.styles";
import { useApi } from "../api/useApi";

export default function AddPostScreen({ route }) {
    const { movieId: initialMovieId } = route.params;
    const [movieId, setMovieId] = useState(initialMovieId ?? null);
    const [movie, setMovie] = useState(null);
    const { loggedUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const { call } = useApi();

    const { movies } = useMovies();
    const [postText, setPostText] = useState(
        "I really look forward to watch this movie !"
    );

    useEffect(() => {
        if (movieId) {
            setMovie(movies.find((m) => m.id == movieId));
        } else {
            setMovie(null);
        }
    }, [movieId]);

    const publishPost = async () => {
        if (!postText.trim()) {
            alert("You must write a post.");
            return;
        }

        setLoading(true);

        try {
            await call(
                "post",
                "posts",
                { content: postText, movie_id: movieId ?? null },
                true
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        Alert.alert("Success", "Post published");
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

                <TouchableOpacity
                    style={[
                        styles.publishButton,
                        (!postText.trim() || loading) && styles.buttonDisabled,
                    ]}
                    onPress={publishPost}
                    disabled={loading || !postText.trim()}
                >
                    <Text style={styles.publishButtonText}>
                        {loading ? "PUBLISHING..." : "PUBLISH"}
                    </Text>
                </TouchableOpacity>
            </View>
        </AppLayout>
    );
}
