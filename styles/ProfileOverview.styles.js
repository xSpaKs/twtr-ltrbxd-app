import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    favoriteText: {
        fontSize: 16,
        paddingBottom: 8,
        color: "#666",
    },
    statText: {
        fontSize: 16,
        marginTop: 24,
        color: "#666",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 6,
    },
    dataContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
});
