import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    profile: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    info: {
        alignItems: "center",
        marginTop: 8,
    },
    username: {
        fontWeight: "600",
        fontSize: 16,
    },
    joined: {
        color: "#666",
        fontSize: 12,
        marginVertical: 2,
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
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    selectButton: {
        backgroundColor: "#000",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    selectButtonText: {
        fontWeight: "500",
        color: "#fff",
    },
    selectedPreview: {
        fontSize: 12,
        color: "#555",
    },
    selectedPost: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 12,
        padding: 16,
        maxHeight: "60%",
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    modalPostItem: {
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 10,
        minHeight: 60,
        justifyContent: "center",
    },
    modalPostSelected: {
        backgroundColor: "#e0f0ff",
        borderWidth: 2,
        borderColor: "#007AFF",
    },
    modalClose: {
        marginTop: 16,
        alignItems: "center",
    },
    modalCloseText: {
        color: "#007AFF",
        fontWeight: "600",
    },
    textArea: {
        minHeight: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: "top",
        backgroundColor: "#fff",
    },
    submitButton: {
        marginTop: 24,
        backgroundColor: "#007AFF",
        padding: 14,
        marginHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    submitText: {
        color: "#fff",
        fontWeight: "600",
    },
});
