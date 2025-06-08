import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "./CustomTabBar";
import TimelineTabs from "./TimelineTabs";
import ProfileScreen from "../screens/ProfileScreen";
import AddPostScreen from "../screens/AddPostScreen";
import ListDiscussionsScreen from "../screens/ListDiscussionsScreen";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function ScreensWithTabs() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Timeline" component={TimelineTabs} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="AddPost" component={AddPostScreen} />
                <Stack.Screen
                    name="Discussion"
                    component={ListDiscussionsScreen}
                />
            </Stack.Navigator>
            <CustomTabBar />
        </View>
    );
}
