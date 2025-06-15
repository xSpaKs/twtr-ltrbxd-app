import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "./CustomTabBar";
import TimelineTabs from "./TimelineTabs";
import ProfileScreen from "../screens/ProfileScreen";
import AddPostScreen from "../screens/AddPostScreen";
import ListDiscussionsScreen from "../screens/ListDiscussionsScreen";
import ReviewScreen from "../screens/ReviewScreen";
import { View } from "react-native";
import PostScreen from "../screens/PostScreen";
import AddReviewScreen from "../screens/AddReviewScreen";
import SearchReviewFilmScreen from "../screens/SearchReviewFilmScreen";
import DiscussionScreen from "../screens/DiscussionScreen";

const Stack = createNativeStackNavigator();

export default function ScreensWithTabs() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Timeline" component={TimelineTabs} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="AddPost" component={AddPostScreen} />
                <Stack.Screen name="AddReview" component={AddReviewScreen} />
                <Stack.Screen
                    name="ListDiscussions"
                    component={ListDiscussionsScreen}
                />
                <Stack.Screen name="Discussion" component={DiscussionScreen} />
                <Stack.Screen name="Post" component={PostScreen} />
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen
                    name="SearchReviewFilm"
                    component={SearchReviewFilmScreen}
                />
            </Stack.Navigator>
            <CustomTabBar />
        </View>
    );
}
