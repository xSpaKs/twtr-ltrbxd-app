import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostTimeline from "../Timelines/Posts/PostTimeline";
import ReviewTimeline from "../Timelines/Reviews/ReviewTimeline";

const TopTab = createMaterialTopTabNavigator();

export default function TimelineTabs() {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: "#1C1C1E" },
                tabBarStyle: { backgroundColor: "#fff" },
            }}
        >
            <TopTab.Screen name="Posts" component={PostTimeline} />
            <TopTab.Screen name="Reviews" component={ReviewTimeline} />
        </TopTab.Navigator>
    );
}
