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
import { goToProfile, goToBack } from "../../helpers/navigation.helper";

const UserTopbar = ({ otherUser }) => {
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goToProfile(otherUser.id)}>
                    <View style={styles.headerLeft}>
                        {otherUser && (
                            <>
                                <TouchableOpacity
                                    onPress={goToBack}
                                    style={styles.backIcon}
                                >
                                    <Ionicons
                                        name="arrow-back"
                                        size={24}
                                        color="white"
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
        backgroundColor: "#1C1C1E",
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
        color: "white",
    },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "white",
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
