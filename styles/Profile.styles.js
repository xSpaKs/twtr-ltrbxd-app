import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#ddd",
    },
    info: {
        flex: 1,
        marginLeft: 12,
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
    headerRightButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    followButton: {
        borderColor: "#333",
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
        minWidth: 70,
    },
    followButtonText: {
        color: "#333",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
    noFollowButton: {
        backgroundColor: "#333",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
        minWidth: 70,
    },
    noFollowButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
    menuButton: {
        padding: 6,
    },
    logoutButton: {
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: "#d9534f",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
        paddingRight: 12,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 6,
        width: 160,
        elevation: 5,
        paddingVertical: 8,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    blockedText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginTop: 40,
    },
});
