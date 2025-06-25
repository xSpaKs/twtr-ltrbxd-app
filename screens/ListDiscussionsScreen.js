import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import API from "../api/API";
import DiscussionPreview from "../components/DiscussionPreview";
import AppLayout from "../components/AppLayout";
import BasicTopBar from "../components/Bars/BasicTopBar";

const ListDiscussionsScreen = () => {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscussions = async () => {
            setLoading(true);
            try {
                const data = await API.call(
                    "get",
                    "users/discussions",
                    {},
                    true
                );

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        padding: 16,
    },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ListDiscussionsScreen;
