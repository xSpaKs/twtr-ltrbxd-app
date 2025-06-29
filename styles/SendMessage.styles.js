import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    profile: {
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 6,
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 16,
        flex: 1,
    },
    button: {
        backgroundColor: "#555",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    info: {
        alignItems: "center",
    },
    username: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    },
    joined: {
        color: "#666",
        fontSize: 12,
        marginVertical: 2,
        textAlign: "center",
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 8,
    },
    stat: {
        fontSize: 13,
        color: "#666",
    },
    bold: {
        fontWeight: "bold",
        color: "#333",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 12,
    },
});
