import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import TimelineScreen from "../screens/PostTimelineScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DiscussionsScreen from "../screens/ListDiscussionsScreen";
import AddPostScreen from "../screens/AddPostScreen";

const Tab = createBottomTabNavigator();

function AddButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
    );
}

export default function TabRoutes({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name="Timeline"
                    component={TimelineScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="home-outline"
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={TimelineScreen}
                    options={{
                        tabBarButton: () => (
                            <AddButton onPress={() => setModalVisible(true)} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="person-outline"
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen
                    name="Discussions"
                    component={DiscussionsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="mail-outline"
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
            </Tab.Navigator>

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
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("AddMovie");
                            }}
                        >
                            <Text>➕ Ajouter un film</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.popupButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("AddPost");
                            }}
                        >
                            <Text>✍️ Ajouter un post</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#000",
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    popupButton: {
        paddingVertical: 5,
    },
});
