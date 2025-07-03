import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    title: { fontSize: 20, fontWeight: "bold" },
    content: { marginTop: 10, fontSize: 16 },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    replyText: {
        color: "#666",
        fontSize: 14,
        marginLeft: 10,
    },
});
