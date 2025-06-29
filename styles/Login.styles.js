import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f9f9f9",
    },
    form: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 24,
        textAlign: "center",
        color: "#333",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#1C1C1E",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    registerLink: {
        marginTop: 16,
        textAlign: "center",
        color: "#555",
        textDecorationLine: "underline",
    },
});
