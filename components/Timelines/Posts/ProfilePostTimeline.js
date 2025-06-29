import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import PostItem from "../../PostItem";
import API from "../../../api/API";
import AppLayout from "../../AppLayout";

const ProfilePostTimeline = ({ route }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = route.params;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await API.call(
                "get",
                `users/${user.id}/timeline/posts?page=${page}`,
                {},
                true
            );

            const newPosts = res;
            setPosts((prev) => [...prev, ...newPosts.data]);
            setHasMore(newPosts.next_page_url !== null);
            setPage((prev) => prev + 1);
        } catch (e) {
            console.error("Erreur chargement posts :", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            {posts.length === 0 ? (
                <View style={styles.centered}>
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Text style={styles.emptyText}>No posts found...</Text>
                    )}
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PostItem post={item} linesLimit={6} />
                    )}
                    onEndReached={fetchPosts}
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

export default ProfilePostTimeline;
