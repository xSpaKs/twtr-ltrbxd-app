import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import ReviewItem from "../../ReviewItem";
import API from "../../../api/API";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "../../AppLayout";

const ProfileReviewTimeline = ({ route }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = route.params;

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await API.call(
                "get",
                `users/${user.id}/timeline/reviews?page=${page}`,
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

    if (reviews.length === 0) {
        return (
            <AppLayout>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No reviews found...</Text>
                </View>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
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
        </AppLayout>
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
});

export default ProfileReviewTimeline;
