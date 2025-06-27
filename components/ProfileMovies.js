import React from "react";
import {
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useMovies } from "../context/MovieContext";
import { useNavigation } from "@react-navigation/native";
import StarRatingDisplay from "../components/StarRatingDisplay";
import { goToReviewDetail } from "../helpers/navigation.helper";

const ProfileMovies = ({ reviews }) => {
    const { movies } = useMovies();
    const navigation = useNavigation();

    if (!reviews || reviews.length === 0) {
        return (
            <View style={styles.container}>
                {[...Array(4)].map((_, i) => (
                    <View key={i} style={styles.skeletonPoster} />
                ))}
            </View>
        );
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {reviews.slice(0, 10).map((review, index) => {
                const movie = movies.find((m) => m.id === review.movie_id);
                if (!movie) return null;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => goToReviewDetail(review.id)}
                        style={styles.card}
                    >
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w154${movie.poster_url}`,
                            }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <StarRatingDisplay
                            rating={review.rating}
                            size={12}
                            showNumber={false}
                            style={styles.rating}
                        />
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    card: {
        alignItems: "center",
        marginRight: 12,
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginBottom: 4,
    },

    skeletonPoster: {
        width: 80,
        height: 120,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
        marginRight: 10,
    },
});

export default ProfileMovies;
