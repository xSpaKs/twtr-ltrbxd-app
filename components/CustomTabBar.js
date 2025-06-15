import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import { navigate } from "../navigation/RootNavigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";

export default function CustomTabBar() {
    const { user } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.tab}>
                <TouchableOpacity onPress={() => navigate("Timeline")}>
                    <Ionicons name="skull-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate("Timeline")}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.addButton}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigate("Profile", { id: user.id })}
                >
                    <Ionicons name="person-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate("ListDiscussions")}>
                    <Ionicons name="mail-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.popup}>
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigate("SearchReviewFilm");
                            }}
                        >
                            <Text>➕ Ajouter un film</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigate("AddPost");
                            }}
                        >
                            <Text>✍️ Ajouter un post</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    tab: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#f9f9f9",
        borderTopWidth: 1,
        borderColor: "#ccc",
        marginBottom: 50,
    },
    addButton: {
        backgroundColor: "#000",
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 8,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        minWidth: 200,
    },
    popupButton: {
        paddingVertical: 10,
        alignItems: "center",
    },
});
