import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import API from "../api/API";
import ReviewItem from "../components/ReviewItem";

export default function ReviewScreen({ route }) {
    const { reviewId } = route.params;

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await API.call(
                    "get",
                    `reviews/${reviewId}`,
                    {},
                    true
                );
                setReview(data);
            } catch (err) {
                console.error("Erreur fetch review :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [reviewId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!review) {
        return (
            <View style={styles.centered}>
                <Text>Review not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ReviewItem review={review} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: "bold" },
    content: { marginTop: 10, fontSize: 16 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
