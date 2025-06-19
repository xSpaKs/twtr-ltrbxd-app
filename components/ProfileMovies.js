import React from "react";
import {
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import { useMovies } from "../context/MovieContext";
import { useNavigation } from "@react-navigation/native";

const ProfileMovies = ({ reviews }) => {
    const { movies } = useMovies();
    const navigation = useNavigation();

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
                        onPress={() =>
                            navigation.navigate("Review", {
                                reviewId: review.id,
                            })
                        }
                    >
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w154${movie.poster_url}`,
                            }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text>{review.rating}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
});

export default ProfileMovies;
