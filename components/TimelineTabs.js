// navigation/TimelineTabs.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostTimelineScreen from "../screens/PostTimelineScreen";
import ReviewTimelineScreen from "../screens/ReviewTimelineScreen";

const TopTab = createMaterialTopTabNavigator();

export default function TimelineTabs() {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: "#000" },
                tabBarStyle: { backgroundColor: "#fff", paddingTop: 24 },
            }}
        >
            <TopTab.Screen name="Posts" component={PostTimelineScreen} />
            <TopTab.Screen name="Reviews" component={ReviewTimelineScreen} />
        </TopTab.Navigator>
    );
}
