import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    movieHeader: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
    },
    poster: {
        width: 85,
        height: 120,
        borderRadius: 4,
        backgroundColor: "#933",
    },
    movieInfo: {
        flex: 1,
        marginLeft: 12,
    },
    movieTitle: {
        fontWeight: "bold",
        fontSize: 15,
    },
    movieYear: {
        color: "#888",
        fontWeight: "normal",
    },
    movieDescription: {
        marginTop: 4,
        fontSize: 13,
        color: "#444",
        lineHeight: 16,
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 12,
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    label: {
        fontWeight: "bold",
        fontSize: 14,
    },
    textArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top",
        fontSize: 15,
        marginBottom: 16,
    },

    starsWrapper: {
        justifyContent: "center",
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
});
