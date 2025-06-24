import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import ProfileMovies from "../components/ProfileMovies";
import { useEffect } from "react";
import API from "../api/API";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const ProfileOverviewScreen = ({ route }) => {
    const [bestRatedReviews, setBestRatedReviews] = useState([]);
    const { user } = route.params;
    const { loggedUser } = useAuth();
    const isOwnUser = loggedUser.id == user.id;

    const navigation = useNavigation();

    useEffect(() => {
        const fetchHighestRatedReviews = async () => {
            const data = await API.call(
                "get",
                `users/${user.id}/bestRatedReviews`,
                {},
                true
            );
            setBestRatedReviews(data.reviews);
        };

        fetchHighestRatedReviews();
    }, []);

    const goToPosts = () => {
        navigation.navigate("ProfilePosts", { user: user });
    };

    const goToWatchlist = () => {
        navigation.navigate("Watchlist", { user: user, isOwnUser: isOwnUser });
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.favorites}>
                    <Text style={styles.favoriteText}>
                        {user.username}
                        {user.username.slice(-1) === "s" ? "'" : "'s"} favorite
                        movies
                    </Text>
                    <ProfileMovies
                        style={styles.bestMovies}
                        reviews={bestRatedReviews}
                    />
                    <Text style={styles.statText}>
                        {user.username}
                        {user.username.slice(-1) === "s" ? "'" : "'s"}{" "}
                        statistics
                    </Text>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.dataContainer}>
                        <Text>Reviews</Text>
                        <Text>{user.reviews_count}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={goToPosts}
                        style={styles.dataContainer}
                    >
                        <Text>Posts</Text>
                        <Text>{user.posts_count}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={goToWatchlist}
                        style={styles.dataContainer}
                    >
                        <Text>Watchlist</Text>
                        <Text>{user.watchlist_count}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    favoriteText: {
        fontSize: 16,
        paddingBottom: 8,
        color: "#666",
    },
    statText: {
        fontSize: 16,
        marginTop: 24,
        color: "#666",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 6,
    },
    dataContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
});

export default ProfileOverviewScreen;
