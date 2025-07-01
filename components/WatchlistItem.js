import React from "react";
import { Image, StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { goToMovieDetail } from "../helpers/navigation.helper";
import { useApi } from "../api/useApi";

const WatchlistItem = ({ movie, isOwnUser, onRemove }) => {
    const { call } = useApi();

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
                            await call(
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
            onPress={() => goToMovieDetail(movie.id)}
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
