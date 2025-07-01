import { View, StyleSheet, StatusBar } from "react-native";

export default function AppLayout({ children, color = "#1C1C1E" }) {
    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
                <View style={[styles.top, { backgroundColor: color }]}></View>
                <View style={styles.content}>{children}</View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        height: 30,
    },
    content: {
        flex: 1,
    },
});
