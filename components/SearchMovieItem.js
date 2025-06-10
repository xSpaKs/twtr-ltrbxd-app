import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchMovieItem = ({ id, title, posterUrl, releaseDate }) => {
    const navigation = useNavigation();

    const goToAddReview = () => {
        navigation.navigate("AddReview", { movieId: id });
    };

    return (
        <TouchableOpacity onPress={goToAddReview} style={styles.container}>
            {posterUrl && (
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w92${posterUrl}`,
                    }}
                    style={styles.poster}
                />
            )}
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text>Sortie : {releaseDate}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    poster: {
        width: 60,
        height: 90,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default SearchMovieItem;
