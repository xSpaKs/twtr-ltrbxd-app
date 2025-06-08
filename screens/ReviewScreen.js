import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import API from "../api/API";

export default function ReviewScreen() {
    const route = useRoute();
    const { reviewId } = route.params;

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await API.call("get", `reviews/${reviewId}`);
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
            <Text style={styles.title}>Review#{review.id}</Text>
            <Text style={styles.content}>{review.title}</Text>
            <Text style={styles.content}>{review.body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: "bold" },
    content: { marginTop: 10, fontSize: 16 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
