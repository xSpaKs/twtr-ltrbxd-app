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

export default function CustomTabBar({ currentRoute }) {
    const { loggedUser } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);

    const isSearchMovieActive = ["SearchMovie"].includes(currentRoute);
    const isHomeActive = ["Timeline"].includes(currentRoute);
    const isAddActive = ["AddPost", "AddReview"].includes(currentRoute);
    const isProfileActive = ["Profile", "EditProfile"].includes(currentRoute);
    const isDiscussionActive = ["ListDiscussions", "Discussion"].includes(
        currentRoute
    );
    return (
        <>
            <View style={styles.tab}>
                <TouchableOpacity onPress={() => goToSearchMovie("Movie")}>
                    <Ionicons
                        name={isSearchMovieActive ? "search" : "search-outline"}
                        size={24}
                        color={isSearchMovieActive ? "gold" : "white"}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToTimeline(true)}>
                    <Ionicons
                        name={isHomeActive ? "home" : "home-outline"}
                        size={24}
                        color={isHomeActive ? "gold" : "white"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.addButton}
                >
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToProfile(loggedUser.id)}>
                    <Ionicons
                        name={isProfileActive ? "person" : "person-outline"}
                        size={24}
                        color={isProfileActive ? "gold" : "white"}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={goToListDiscussions}>
                    <Ionicons
                        name={isDiscussionActive ? "mail" : "mail-outline"}
                        size={24}
                        color={isDiscussionActive ? "gold" : "white"}
                    />
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
        backgroundColor: "#1C1C1E",
        borderTopWidth: 1,
        borderColor: "#ccc",
        marginBottom: 48,
    },
    addButton: {
        backgroundColor: "#fff",
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
