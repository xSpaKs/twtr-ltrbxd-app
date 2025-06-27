import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import formatDate from "../helpers/formatDate.helper";
import { goToDiscussion } from "../helpers/navigation.helper";

export default function DiscussionPreview({ discussion }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => goToDiscussion(discussion.id)}
        >
            <View style={styles.row}>
                <View style={styles.leftRow}>
                    <Image
                        source={{
                            uri: discussion.other_user.profile_picture_url,
                        }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>
                        @{discussion.other_user.username}
                    </Text>
                </View>
                <Text style={styles.date}>
                    {formatDate(discussion.last_message_at)}
                </Text>
            </View>
            <Text numberOfLines={3} style={styles.preview}>
                {discussion.last_message?.content || "Aucun message"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    leftRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 8,
    },
    date: {
        color: "#888",
        fontSize: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    preview: {
        color: "#333",
        marginTop: 4,
        fontSize: 14,
    },
});
