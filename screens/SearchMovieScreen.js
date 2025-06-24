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
import AppLayout from "../components/AppLayout";
import SearchMovieTopBar from "../components/Bars/SearchMovieTopBar";
const SearchMovieScreen = ({ route }) => {
    const { movies } = useMovies();
    const [search, setSearch] = useState("");
    const { nextUrl } = route.params || "Movie";

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout>
            <SearchMovieTopBar title={"Pick a movie"} nextUrl={nextUrl} />
            <View style={styles.container}>
                <TextInput
                    placeholder="Search for a movie..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchBar}
                />

                <FlatList
                    data={filteredMovies.slice(0, 15)}
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
                            <Text style={styles.emptyText}>
                                No movie found...
                            </Text>
                        </View>
                    }
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                    }}
                />
            </View>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
    },
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
    searchBar: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "white",
    },
});

export default SearchMovieScreen;
