import { Text, View, TouchableOpacity } from "react-native";
import ProfileMovies from "../components/ProfileMovies";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { goToWatchlist } from "../helpers/navigation.helper";
import { styles } from "../styles/ProfileOverview.styles";
import { useApi } from "../api/useApi";

const ProfileOverviewScreen = ({ route }) => {
    const [bestRatedReviews, setBestRatedReviews] = useState([]);
    const { user } = route.params;
    const { loggedUser } = useAuth();
    const isOwnUser = loggedUser.id == user.id;
    const { call } = useApi();

    useEffect(() => {
        const fetchHighestRatedReviews = async () => {
            const data = await call(
                "get",
                `users/${user.id}/bestRatedReviews`,
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
                        onPress={() => goToPosts(user)}
                        style={styles.dataContainer}
                    >
                        <Text>Posts</Text>
                        <Text>{user.posts_count}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => goToWatchlist(user, isOwnUser)}
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

export default ProfileOverviewScreen;
