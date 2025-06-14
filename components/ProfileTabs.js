import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostTimelineScreen from "../screens/PostTimelineScreen";
import ReviewTimelineScreen from "../screens/ReviewTimelineScreen";

const TopTab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: "#000" },
                tabBarStyle: { backgroundColor: "#fff" },
            }}
        >
            <TopTab.Screen
                name="Overview"
                component={PostTimelineScreen}
                initialParams={{ source: "user_posts" }}
            />
            <TopTab.Screen
                name="Posts"
                component={PostTimelineScreen}
                initialParams={{ source: "user_posts" }}
            />
            <TopTab.Screen
                name="Reviews"
                component={ReviewTimelineScreen}
                initialParams={{ source: "user_reviews" }}
            />
        </TopTab.Navigator>
    );
}
