import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostTimeline from "../Timelines/Posts/PostTimeline";
import ReviewTimeline from "../Timelines/Reviews/ReviewTimeline";

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
            <TopTab.Screen name="Posts" component={PostTimeline} />
            <TopTab.Screen name="Reviews" component={ReviewTimeline} />
        </TopTab.Navigator>
    );
}
