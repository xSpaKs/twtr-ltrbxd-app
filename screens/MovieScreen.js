import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMovies } from "../context/MovieContext";
import { useEffect, useState } from "react";
import StarRatingDisplay from "../components/StarRatingDisplay";
import { Ionicons } from "@expo/vector-icons";

const MovieScreen = ({ route }) => {
    const { movieId } = route.params;
    const navigation = useNavigation();
    const { movies } = useMovies();
    const movie = movies.find((m) => m.id == movieId);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!movieId) {
            navigation.navigate("SearchMovie");
        }
    }, [movieId]);

    if (!movie) {
        return <Text>Chargement...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${movie.poster_url}`,
                    }}
                    style={styles.poster}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        {movie.title}{" "}
                        <Text style={styles.year}>
                            ({movie.release_date.slice(0, 4)})
                        </Text>
                    </Text>
                    <View style={styles.separator} />
                    <View style={styles.rateContainer}>
                        <Text>Rating</Text>
                        <StarRatingDisplay rating={movie.average_rating} />
                    </View>
                    <View style={styles.separator} />
                    <Text>
                        <Text style={{ color: "#888" }}>Discussed about </Text>
                        <Text>{movie.posts_count}</Text>
                        <Text style={{ color: "#888" }}>
                            {" "}
                            time{movie.posts_count > 1 && "s"}
                        </Text>
                    </Text>
                    <View style={styles.separator} />
                    <Text>
                        <Text style={{ color: "#888" }}>Reviewed </Text>
                        <Text>{movie.reviews_count}</Text>
                        <Text style={{ color: "#888" }}>
                            {" "}
                            time{movie.reviews_count > 1 && "s"}
                        </Text>
                    </Text>
                </View>
            </View>
            <View>
                <Text
                    style={styles.description}
                    numberOfLines={expanded ? undefined : 4}
                >
                    {movie.description}
                </Text>
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    style={styles.iconWrapper}
                >
                    <Ionicons
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={24}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    poster: {
        width: 110,
        height: 170,
        borderRadius: 8,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 24,
    },
    description: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
    year: {
        fontSize: 14,
        color: "#666",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 12,
    },
    rateContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconWrapper: {
        marginTop: 8,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MovieScreen;
