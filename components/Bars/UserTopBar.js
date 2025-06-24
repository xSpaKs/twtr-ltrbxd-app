import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const UserTopbar = ({ otherUser }) => {
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate("Profile", { id: otherUser.id });
    };
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToProfile}>
                    <View style={styles.headerLeft}>
                        {otherUser && (
                            <>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={styles.backIcon}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                                <Image
                                    source={{
                                        uri: otherUser.profile_picture_url,
                                    }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.headerUsername}>
                                    @{otherUser.username}
                                </Text>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
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
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    headerUsername: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#333",
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#ccc",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
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
    },
    backIcon: {
        padding: 4,
        marginRight: 6,
    },
});

export default UserTopbar;
