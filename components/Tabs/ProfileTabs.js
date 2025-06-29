import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePostTimeline from "../Timelines/Posts/ProfilePostTimeline";
import ProfileOverviewScreen from "../../screens/ProfileOverviewScreen";
import ProfileReviewTimeline from "../Timelines/Reviews/ProfileReviewTimeline";

const TopTab = createMaterialTopTabNavigator();

export default function ProfileTabs({ user }) {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: "#1C1C1E" },
                tabBarStyle: { backgroundColor: "whie" },
            }}
        >
            <TopTab.Screen
                name="Overview"
                component={ProfileOverviewScreen}
                initialParams={{ user }}
            />
            <TopTab.Screen
                name="ProfilePosts"
                component={ProfilePostTimeline}
                options={{ title: "Posts" }}
                initialParams={{ user }}
            />
            <TopTab.Screen
                name="ProfileReviews"
                component={ProfileReviewTimeline}
                options={{ title: "Reviews" }}
                initialParams={{ user }}
            />
        </TopTab.Navigator>
    );
}
