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

const MovieTopBar = ({ title }) => {
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
                        <Ionicons name="arrow-back" size={24} color="#555" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={24}
                        color="#555"
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
                            }}
                            style={styles.modalOption}
                        >
                            <Text style={styles.modalOptionText}>
                                Add to watchlist
                            </Text>
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
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginTop: 4,
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalOption: {
        paddingVertical: 12,
    },
    modalOptionText: {
        fontSize: 16,
    },
});

export default MovieTopBar;
