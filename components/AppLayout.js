import React from "react";
import { View, StyleSheet } from "react-native";
import CustomTabBar from "./Bars/CustomTabBar";
import { useRoute } from "@react-navigation/native";

const PAGES_WITH_TAB = [];

export default function AppLayout({ children }) {
    const route = useRoute();

    const showTabBar = PAGES_WITH_TAB.includes(route.name);

    return (
        <View style={styles.container}>
            <View style={styles.content}>{children}</View>
            {showTabBar && <CustomTabBar />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
    content: {
        flex: 1,
    },
});
