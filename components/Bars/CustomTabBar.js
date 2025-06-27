import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import {
    goToTimeline,
    goToProfile,
    goToSearchMovie,
    goToListDiscussions,
} from "../../helpers/navigation.helper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext";

export default function CustomTabBar() {
    const { loggedUser } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.tab}>
                <TouchableOpacity onPress={() => goToSearchMovie("Movie")}>
                    <Ionicons name="search-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={goToTimeline}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.addButton}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToProfile(loggedUser.id)}>
                    <Ionicons name="person-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={goToListDiscussions}>
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
                        <Text style={styles.title}>What to do ?</Text>
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => {
                                setModalVisible(false);
                                goToSearchMovie("AddReview");
                            }}
                        >
                            <Ionicons
                                name="film-outline"
                                size={32}
                                color="black"
                            />
                            <View style={styles.text}>
                                <Text style={styles.mainText}>Add a movie</Text>
                                <Text style={styles.secondaryText}>
                                    Write a review
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => {
                                setModalVisible(false);
                                goToSearchMovie("AddPost");
                            }}
                        >
                            <Ionicons
                                name="chatbox-outline"
                                size={32}
                                color="black"
                            />
                            <View style={styles.text}>
                                <Text style={styles.mainText}>
                                    Publish a post
                                </Text>
                                <Text style={styles.secondaryText}>
                                    Share a thought
                                </Text>
                            </View>
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
        paddingHorizontal: 40,
        paddingVertical: 30,
        borderRadius: 10,
        elevation: 5,
        minWidth: 200,
    },
    popupButton: {
        paddingVertical: 10,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {},
    mainText: {
        fontSize: 16,
    },
    secondaryText: {
        fontSize: 13,
        color: "#666",
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 6,
    },
});
