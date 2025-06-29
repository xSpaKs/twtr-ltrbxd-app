import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    parentPreview: {
        margin: 12,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    inputWrapper: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 6,
        justifyContent: "flex-start",
    },
    textInput: {
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: "top",
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    publishButton: {
        paddingVertical: 10,
        backgroundColor: "#1C1C1E",
        borderRadius: 8,
    },
    publishButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
});
