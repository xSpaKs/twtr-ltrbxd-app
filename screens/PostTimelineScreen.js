import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import PostItem from "../components/PostItem";
import API from "../api/API";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "../components/AppLayout";

const PostTimelineScreen = ({ route }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation();
    const { source = "timeline" } = route.params || {};

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            let endpoint = "";
            if (source === "timeline") {
                endpoint = `timeline/posts?page=${page}`;
            } else if (source === "user_posts") {
                endpoint = `timeline/posts/me?page=${page}`;
            }

            const res = await API.call("get", endpoint, {}, true);

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
        <AppLayout>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PostItem post={item} navigation={navigation} />
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
        </AppLayout>
    );
};

export default PostTimelineScreen;
