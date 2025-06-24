import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import API from "../api/API";
import DiscussionPreview from "../components/DiscussionPreview";
import AppLayout from "../components/AppLayout";

const ListDiscussionsScreen = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const fetchDiscussions = async () => {
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
        };

        fetchDiscussions();
    }, []);

    return (
        <AppLayout>
            <View style={styles.container}>
                <Text>Discussions</Text>
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
});

export default ListDiscussionsScreen;
