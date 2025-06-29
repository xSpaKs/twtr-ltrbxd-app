import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        backgroundColor: "white",
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
        textAlign: "center",
    },
    searchBar: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "white",
    },
});
