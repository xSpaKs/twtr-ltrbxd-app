import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export const MainScreenTopBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Image
                    source={require("../../assets/simple-logo-nocolor.png")}
                    style={styles.logo}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        paddingHorizontal: 8,
        backgroundColor: "#1C1C1E",
    },
    logoWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 35,
        height: 35,
    },
});
