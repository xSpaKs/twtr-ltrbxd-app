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

const PostTimeline = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await API.call(
                "get",
                `timeline/posts?page=${page}`,
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

    const refreshPosts = async () => {
        setRefreshing(true);
        try {
            const res = await API.call(
                "get",
                `timeline/posts?page=1`,
                {},
                true
            );
            setPosts(res.data);
            setHasMore(res.next_page_url !== null);
            setPage(2);
        } catch (e) {
            console.error("Erreur refresh posts :", e);
        } finally {
            setRefreshing(false);
        }
    };

    if (!loading && posts.length === 0) {
        return (
            <AppLayout>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No posts found...</Text>
                </View>
            </AppLayout>
        );
    }

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
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PostItem post={item} linesLimit={6} />
                    )}
                    onEndReached={fetchPosts}
                    onEndReachedThreshold={0.4}
                    refreshing={refreshing}
                    onRefresh={refreshPosts}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#ccc",
                                marginHorizontal: 0,
                            }}
                        />
                    )}
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

export default PostTimeline;
