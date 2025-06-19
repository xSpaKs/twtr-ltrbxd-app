import { Text, StyleSheet, View } from "react-native";
import ProfileMovies from "../components/ProfileMovies";
import { useEffect } from "react";
import API from "../api/API";
import { useState } from "react";

const ProfileOverviewScreen = () => {
    const [bestRatedReviews, setBestRatedReviews] = useState([]);

    useEffect(() => {
        const fetchHighestRatedReviews = async () => {
            const data = await API.call(
                "get",
                "users/bestRatedReviews",
                {},
                true
            );
            setBestRatedReviews(data.reviews);
        };

        fetchHighestRatedReviews();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.favorites}>
                    <Text style={styles.favoriteText}>Favorite movies</Text>
                    <ProfileMovies reviews={bestRatedReviews} />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    favorites: {},
    favoriteText: {
        fontSize: 16,
        paddingBottom: 8,
        color: "#666",
    },
});

export default ProfileOverviewScreen;
