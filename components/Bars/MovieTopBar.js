import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MovieTopBar = ({ title, onPress, option, icon }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backIcon}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                                onPress();
                            }}
                            style={styles.modalOption}
                        >
                            {icon}
                            <Text style={styles.modalOptionText}>{option}</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#1C1C1E",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        padding: 4,
        marginRight: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
    },
    modalOption: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    modalOptionText: {
        fontSize: 16,
    },
});

export default MovieTopBar;
