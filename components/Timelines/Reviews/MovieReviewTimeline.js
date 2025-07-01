import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import ReviewItem from "../../ReviewItem";
import { useApi } from "../../../api/useApi";

const MovieReviewTimelineScreen = ({ route }) => {
    const { movieId } = route.params;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { call } = useApi();

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await call(
                "get",
                `movies/${movieId}/popular-reviews?page=${page}`,
                {},
                true
            );

            const newReviews = res;
            setReviews((prev) => [...prev, ...newReviews.data]);
            setHasMore(newReviews.next_page_url !== null);
            setPage((prev) => prev + 1);
        } catch (e) {
            console.error("Erreur chargement reviews :", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            {reviews.length === 0 ? (
                <View style={styles.centered}>
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Text style={styles.emptyText}>
                            No reviews found...
                        </Text>
                    )}
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={reviews}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ReviewItem review={item} linesLimit={3} />
                    )}
                    onEndReached={fetchReviews}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator
                                size="small"
                                style={{ marginVertical: 10 }}
                            />
                        ) : null
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
        textAlign: "center",
    },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MovieReviewTimelineScreen;
