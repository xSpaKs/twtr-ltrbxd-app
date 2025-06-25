import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PostMovieItem = ({ movie }) => {
    const year = new Date(movie.release_date).getFullYear();
    const navigation = useNavigation();

    const goToMovieDetail = () => {
        navigation.navigate("Movie", { movieId: movie.id });
    };

    return (
        <TouchableOpacity onPress={goToMovieDetail}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w154${movie.poster_url}`,
                    }}
                    style={styles.poster}
                />
                <View style={styles.info}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {movie.title}{" "}
                            <Text style={styles.year}>({year})</Text>
                        </Text>
                    </View>
                    <Text
                        style={styles.description}
                        numberOfLines={4}
                        ellipsizeMode="tail"
                    >
                        {movie.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#e5e5e5",
        alignItems: "flex-start",
        marginTop: 10,
        borderRadius: 5,
    },
    poster: {
        width: 85,
        height: 120,
        backgroundColor: "#933",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    info: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
    },
    year: {
        fontWeight: "normal",
        color: "#666",
        fontSize: 12,
    },
    description: {
        marginTop: 4,
        fontSize: 13,
        color: "#666",
    },
});

export default PostMovieItem;
