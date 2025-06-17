import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    TextInput,
    FlatList,
    StyleSheet,
} from "react-native";
import { useMovies } from "../context/MovieContext";
import SearchMovieItem from "../components/SearchMovieItem";

const SearchMovieScreen = ({ route }) => {
    const { movies } = useMovies();
    const [search, setSearch] = useState("");
    const { nextUrl } = route.params || "FilmScreen";

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                placeholder="Rechercher un film..."
                value={search}
                onChangeText={setSearch}
                style={{
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                }}
            />

            <FlatList
                data={filteredMovies.slice(0, 10)}
                keyExtractor={(item) => item.tmdb_id.toString()}
                renderItem={({ item }) => (
                    <SearchMovieItem
                        id={item.id}
                        title={item.title}
                        posterUrl={item.poster_url}
                        releaseDate={item.release_date}
                        description={item.description}
                        nextUrl={nextUrl}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No movie found...</Text>
                    </View>
                }
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
        textAlign: "center",
    },
});

export default SearchMovieScreen;
