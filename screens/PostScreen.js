import React, { useEffect, useState, useRef } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import API from "../api/API";
import BasicTopBar from "../components/Bars/BasicTopBar";
import AppLayout from "../components/AppLayout";
import PostItem from "../components/PostItem";
import ReviewItem from "../components/ReviewItem";
import { styles } from "../styles/Post.styles";

export default function PostScreen({ route }) {
    const { postId } = route.params;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollViewRef = useRef(null);
    const postRef = useRef(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await API.call("get", `posts/${postId}`, {}, true);
                setPost(data);
            } catch (err) {
                console.error("Erreur fetch post :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const renderParentChain = (post) => {
        const chain = [];
        let current = post;

        while (current?.parent_post || current?.parent_review) {
            const parent = current.parent_post || current.parent_review;
            chain.push(parent);
            current = parent;
        }

        return chain.reverse().map((parent, index) => {
            const isReview = !!parent.movie_id && !parent.content;
            return (
                <View key={`parent-${parent.id}`} style={{}}>
                    {isReview ? (
                        <ReviewItem review={parent} />
                    ) : (
                        <PostItem post={parent} />
                    )}
                    <View style={styles.separator} />
                </View>
            );
        });
    };

    const renderReplies = () => {
        if (!post.replies || post.replies.length === 0) return null;

        return (
            <View style={{ marginTop: 24 }}>
                <Text style={styles.replyText}>REPLIES</Text>
                {post.replies.map((reply) => (
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

    if (!post) {
        return (
            <View style={styles.centered}>
                <Text>This post does not exist.</Text>
            </View>
        );
    }

    return (
        <>
            <AppLayout>
                <BasicTopBar title={"Post"} />
                <ScrollView
                    contentContainerStyle={{
                        minHeight: "100%",
                        backgroundColor: "white",
                    }}
                    ref={scrollViewRef}
                >
                    {renderParentChain(post)}

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
                        <PostItem post={post} />
                    </View>
                    <View style={styles.separator} />
                    {renderReplies()}
                </ScrollView>
            </AppLayout>
        </>
    );
}
