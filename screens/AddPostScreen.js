import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    ActivityIndicator,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";

export default function AddPostScreen({ navigation }) {
    const [postText, setPostText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await API.call("get", "movies");
                setAllMovies(response);
            } catch (err) {
                console.error("Erreur récupération films :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = allMovies.filter((film) =>
        film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async () => {
        if (!postText.trim()) {
            alert("Veuillez écrire un post.");
            return;
        }

        console.log("Texte :", postText);
        console.log("Film :", selectedMovie);

        await API.call(
            "post",
            "posts",
            {
                content: postText,
                ...(selectedMovie && { movie_id: selectedMovie.id }),
            },
            true
        );

        alert("Post publié !");
        navigation.navigate("Timeline", { refresh: true });
    };

    return (
        <AppLayout>
            <View style={styles.container}>
                <Text style={styles.label}>Ton message :</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    placeholder="Exprime-toi..."
                    value={postText}
                    onChangeText={setPostText}
                />

                <Text style={styles.label}>Choisis un film :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher un film"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {loading ? (
                    <ActivityIndicator size="small" />
                ) : (
                    searchQuery.length > 0 && (
                        <FlatList
                            data={filteredMovies}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.movieItem,
                                        selectedMovie?.id === item.id &&
                                            styles.selectedMovie,
                                    ]}
                                    onPress={() => setSelectedMovie(item)}
                                >
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )
                )}

                {selectedMovie && (
                    <Text style={styles.selectedLabel}>
                        🎬 Film sélectionné :{" "}
                        {selectedMovie ? selectedMovie.title : "Aucun"}
                    </Text>
                )}

                <Button title="Publier" onPress={handleSubmit} />
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 12,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
    },
    movieItem: {
        padding: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    selectedMovie: {
        backgroundColor: "#d0f0c0",
    },
    selectedLabel: {
        marginVertical: 10,
        fontStyle: "italic",
    },
});
