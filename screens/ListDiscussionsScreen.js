import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import DiscussionPreview from "../components/DiscussionPreview";
import AppLayout from "../components/AppLayout";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { styles } from "../styles/ListDiscussion.styles";
import { useApi } from "../api/useApi";

const ListDiscussionsScreen = () => {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { call } = useApi();

    useEffect(() => {
        const fetchDiscussions = async () => {
            setLoading(true);
            try {
                const data = await call("get", "users/discussions", {}, true);

                setDiscussions(data.discussions);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des discussions :",
                    error
                );
                setDiscussions([]);
            }
            setLoading(false);
        };

        fetchDiscussions();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AppLayout>
            <BasicTopBar title={"Discussions"} />
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={discussions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <DiscussionPreview discussion={item} />
                    )}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            </View>
        </AppLayout>
    );
};

export default ListDiscussionsScreen;
