import React, { useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useMovies } from "../context/MovieContext";
import SearchMovieItem from "../components/SearchMovieItem";

const SearchReviewFilmScreen = () => {
    const { movies } = useMovies();
    const [search, setSearch] = useState("");

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
                data={filteredMovies}
                keyExtractor={(item) => item.tmdb_id.toString()}
                renderItem={({ item }) => (
                    <SearchMovieItem
                        id={item.id}
                        title={item.title}
                        posterUrl={item.poster_url}
                        releaseDate={item.release_date}
                    />
                )}
                ListEmptyComponent={
                    <Text style={{ marginTop: 20 }}>Aucun film trouvé.</Text>
                }
            />
        </View>
    );
};

export default SearchReviewFilmScreen;
