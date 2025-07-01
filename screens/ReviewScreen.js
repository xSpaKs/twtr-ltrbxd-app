import React, { useEffect, useState, useRef } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import ReviewItem from "../components/ReviewItem";
import PostItem from "../components/PostItem";
import BasicTopBar from "../components/Bars/BasicTopBar";
import AppLayout from "../components/AppLayout";
import { styles } from "../styles/Review.styles";
import { useApi } from "../api/useApi";

export default function ReviewScreen({ route }) {
    const { reviewId } = route.params;

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollViewRef = useRef(null);
    const postRef = useRef(null);
    const { call } = useApi();

    useEffect(() => {
        setLoading(true);
        const fetchReview = async () => {
            try {
                const data = await call("get", `reviews/${reviewId}`, {}, true);
                setReview(data);
            } catch (err) {
                console.error("Erreur fetch review :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [reviewId]);

    const renderReplies = () => {
        if (!review.replies || review.replies.length === 0) return null;

        return (
            <View style={{ marginTop: 24 }}>
                <Text>Responses</Text>
                {review.replies.map((reply) => (
                    <PostItem key={reply.id} post={reply} />
                ))}
                <View style={styles.separator} />
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!review) {
        return (
            <AppLayout>
                <View style={styles.centered}>
                    <Text>Review not found.</Text>
                </View>
            </AppLayout>
        );
    }

    return (
        <>
            <AppLayout>
                <BasicTopBar title={"Review"} />
                <ScrollView style={styles.container} ref={scrollViewRef}>
                    <View
                        ref={postRef}
                        onLayout={() => {
                            postRef.current?.measureLayout(
                                scrollViewRef.current,
                                (x, y) => {
                                    scrollViewRef.current.scrollTo({
                                        y,
                                        animated: false,
                                    });
                                },
                                (err) =>
                                    console.error("measureLayout error:", err)
                            );
                        }}
                    >
                        <ReviewItem review={review} />
                    </View>
                    {renderReplies()}
                </ScrollView>
            </AppLayout>
        </>
    );
}
