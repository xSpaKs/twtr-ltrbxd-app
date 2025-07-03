import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { useMovies } from "../context/MovieContext";
import BasicTopBar from "../components/Bars/BasicTopBar";
import StarRatingInput from "../components/StarRatingInput";
import DateInput from "../components/DateInput";
import { goToTimeline, goToMovieDetail } from "../helpers/navigation.helper";
import { styles } from "../styles/AddReview.styles";
import { useApi } from "../api/useApi";

export default function AddReviewScreen({ route }) {
    const { movieId } = route.params;
    const { movies } = useMovies();

    const [reviewText, setReviewText] = useState(
        "This is the best movie I've watched in a long time !"
    );
    const [rating, setRating] = useState(3);
    const [watchDate, setWatchDate] = useState(new Date().toISOString());
    const [loading, setLoading] = useState(false);
    const { call } = useApi();

    const movie = movies.find((m) => m.id == movieId);

    const postReview = async () => {
        try {
            await call(
                "post",
                "reviews",
                {
                    movieId: movieId,
                    content: reviewText,
                    rating: rating,
                    watch_date: watchDate,
                },
                true
            );

            Alert.alert("Success", "Review published !");
            goToTimeline({ refresh: true });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (!movie) {
        return (
            <AppLayout>
                <View style={styles.container}>
                    <Text>Movie loading...</Text>
                </View>
            </AppLayout>
        );
    }

    const formattedDate = watchDate;

    return (
        <AppLayout>
            <View style={{ flex: 1 }}>
                <BasicTopBar title={"Publish a review"} />
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => goToMovieDetail(movieId)}>
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

                    <View style={styles.dateRow}>
                        <Text style={styles.label}>Watch date</Text>
                        <DateInput
                            initialDate={watchDate}
                            onDateChange={(isoDate) => setWatchDate(isoDate)}
                        />
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.noteRow}>
                        <View style={styles.labelWrapper}>
                            <Text style={styles.label}>Rating</Text>
                        </View>
                        <View style={styles.starsWrapper}>
                            <StarRatingInput
                                rating={rating}
                                setRating={setRating}
                            />
                        </View>
                    </View>

                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                    >
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
                        style={styles.publishButton}
                        onPress={postReview}
                    >
                        <Text style={styles.publishButtonText}>
                            {loading ? "PUBLISHING..." : "PUBLISH"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
}
