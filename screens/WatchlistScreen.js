import { FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import API from "../api/API";
import { useMovies } from "../context/MovieContext";
import BasicTopBar from "../components/Bars/BasicTopBar";
import AppLayout from "../components/AppLayout";
import WatchlistItem from "../components/WatchlistItem";
import { styles } from "../styles/Watchlist.styles";

const WatchlistScreen = ({ route }) => {
    const { user, isOwnUser } = route.params;
    const [watchlistIds, setWatchlistIds] = useState([]);
    const { movies } = useMovies();
    const watchlistMovies = movies.filter((m) => watchlistIds.includes(m.id));

    useEffect(() => {
        const fetchWatchlist = async () => {
            const data = await API.call(
                "get",
                `users/${user.id}/watchlist`,
                {},
                true
            );
            const ids = data.watchlist.map((item) => item.movie_id);
            setWatchlistIds(ids);
        };

        fetchWatchlist();
    }, [movies]);
    return (
        <AppLayout>
            <BasicTopBar
                title={
                    user.username +
                    (user.username.slice(-1).toLowerCase() === "s"
                        ? "'"
                        : "'s") +
                    " watchlist"
                }
            />
            <View style={styles.container}>
                <FlatList
                    data={watchlistMovies}
                    numColumns={4}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.flexItem}>
                            <WatchlistItem
                                movie={item}
                                isOwnUser={isOwnUser}
                                onRemove={(id) =>
                                    setWatchlistIds((ids) =>
                                        ids.filter((i) => i !== id)
                                    )
                                }
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.container}
                />
            </View>
        </AppLayout>
    );
};

export default WatchlistScreen;
