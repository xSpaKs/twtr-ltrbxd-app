import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DiscussionPreview({ discussion }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("DiscussionScreen", {
            discussionId: discussion.id,
        });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.row}>
                <Text style={styles.name}>{discussion.other_user_name}</Text>
                <Text style={styles.date}>
                    {new Date(discussion.last_message_at).toLocaleDateString()}
                </Text>
            </View>
            <Text numberOfLines={1} style={styles.preview}>
                {discussion.last_message_content || "Aucun message"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    date: {
        color: "#888",
    },
});
