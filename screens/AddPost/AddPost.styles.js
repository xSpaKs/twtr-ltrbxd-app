import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    movieBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginBottom: 16,
    },
    movieTextContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    movieDate: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    removeButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: "#aa0000",
    },
    selectMovieButton: {
        backgroundColor: "#eeeeee",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    selectMovieText: {
        color: "#333",
        fontWeight: "500",
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
        minHeight: 100,
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
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    profileContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        gap: 10,
        alignItems: "center",
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default styles;
