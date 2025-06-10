import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import ReviewItem from "../components/ReviewItem";
import API from "../api/API";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "../components/AppLayout";

const ReviewTimelineScreen = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await API.call(
                "get",
                `timeline/reviews?page=${page}`,
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

    const goToReviewDetail = (reviewId) => {
        navigation.navigate("Review", { reviewId });
    };
    if (reviews.length == 0) {
        return (
            <AppLayout>
                <Text>No reviews found...</Text>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ReviewItem review={item} onPress={goToReviewDetail} />
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

export default ReviewTimelineScreen;
