import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "#f4f4f4",
    },
    messageContainer: {
        maxWidth: "75%",
        padding: 10,
        borderRadius: 12,
        marginVertical: 6,
    },
    sent: {
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-end",
    },
    received: {
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 16,
        color: "#000",
    },
    messageDate: {
        fontSize: 10,
        color: "#888",
        marginTop: 4,
        textAlign: "right",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 8,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        maxHeight: 100,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        padding: 6,
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    blockedText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        fontStyle: "italic",
        lineHeight: 22,
        paddingHorizontal: 16,
    },
    noMessages: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noMessagesText: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
    },
});
