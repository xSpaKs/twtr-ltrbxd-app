import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BasicTopBar = ({ title }) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backIcon}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title}</Text>
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
    backIcon: {
        padding: 4,
        marginRight: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});

export default BasicTopBar;
