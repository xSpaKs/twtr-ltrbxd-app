import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import { useMovies } from "../context/MovieContext";
import BasicTopBar from "../components/Bars/BasicTopBar";
import StarRatingInput from "../components/StarRatingInput";
import DateInput from "../components/DateInput";
import { goToTimeline } from "../helpers/navigation.helper";
import { styles } from "../styles/AddReview.styles";

export default function AddReviewScreen({ route }) {
    const { movieId } = route.params;
    const { movies } = useMovies();

    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(3);
    const [watchDate, setWatchDate] = useState("");

    const movie = movies.find((m) => m.id == movieId);

    const postReview = async () => {
        await API.call(
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

        alert("Review publiée !");
        goToTimeline({ refresh: true });
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
                        style={styles.button}
                        onPress={postReview}
                    >
                        <Text style={styles.buttonText}>Publish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
}
