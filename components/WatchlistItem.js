import React from "react";
import { Image, StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../api/API";

const WatchlistItem = ({ movie, isOwnUser, onRemove }) => {
    const navigation = useNavigation();

    const goToMovieDetail = () => {
        navigation.navigate("Movie", { movieId: movie.id });
    };

    const handleLongPress = () => {
        if (!isOwnUser) return;

        Alert.alert(
            "Remove from watchlits",
            `Remove "${movie.title}" from your watchlist ?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await API.call(
                                "delete",
                                `watchlist/${movie.id}`,
                                {},
                                true
                            );
                            onRemove?.(movie.id);
                        } catch (err) {
                            console.error("Erreur suppression:", err);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity
            onPress={goToMovieDetail}
            onLongPress={handleLongPress}
            style={styles.container}
        >
            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w154${movie.poster_url}`,
                }}
                style={styles.poster}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        aspectRatio: 2 / 3,
    },
    poster: {
        flex: 1,
    },
});

export default WatchlistItem;
