import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMovies } from "../context/MovieContext";

const MovieScreen = ({ route }) => {
    const { movieId } = route.params;
    const { navigation } = useNavigation();
    const { movies } = useMovies();
    const movie = movies.find((m) => m.id == movieId);

    if (!movieId) {
        navigation.navigate("SearchMovie");
    }

    return (
        <>
            <Text>{movie.title}</Text>
        </>
    );
};

const styles = StyleSheet.create({});

export default MovieScreen;
