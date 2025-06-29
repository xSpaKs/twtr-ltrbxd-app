import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { goToPage } from "../helpers/navigation.helper";

const SearchMovieItem = ({
    id,
    title,
    posterUrl,
    releaseDate,
    description = "",
    nextUrl,
}) => {
    if (!nextUrl) nextUrl = "Movie";

    return (
        <TouchableOpacity
            onPress={() => goToPage(nextUrl, { movieId: id })}
            style={styles.container}
        >
            {posterUrl && (
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w92${posterUrl}`,
                    }}
                    style={styles.poster}
                />
            )}
            <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    {releaseDate && (
                        <Text style={styles.date} numberOfLines={1}>
                            ({releaseDate?.substring(0, 4)})
                        </Text>
                    )}
                </View>
                <Text style={styles.description} numberOfLines={3}>
                    {description || "No description available."}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "white",
    },
    poster: {
        width: 60,
        height: 90,
        marginRight: 12,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        marginBottom: 4,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111",
        marginRight: 6,
        flexShrink: 1,
    },

    date: {
        fontSize: 13,
        color: "#888",
        flexShrink: 0,
    },

    description: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
});

export default SearchMovieItem;
