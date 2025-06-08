import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import API from "../api/API";

export default function PostScreen() {
    const route = useRoute();
    const { postId } = route.params;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await API.call("get", `posts/${postId}`);
                setPost(data);
            } catch (err) {
                console.error("Erreur fetch post :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

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
                <Text>Post introuvable.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Post #{post.id}</Text>
            <Text style={styles.content}>{post.content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: "bold" },
    content: { marginTop: 10, fontSize: 16 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
