import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    poster: {
        width: 110,
        height: 170,
        borderRadius: 8,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 24,
    },
    descriptionContainer: {
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
    year: {
        fontSize: 14,
        color: "#666",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 12,
    },
    rateContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconWrapper: {
        marginTop: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    watchlistText: {
        color: "#666",
        fontSize: 12,
        paddingBottom: 6,
    },
});
