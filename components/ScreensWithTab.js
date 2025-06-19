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
import SearchMovieScreen from "../screens/SearchMovieScreen";
import DiscussionScreen from "../screens/DiscussionScreen";
import MovieScreen from "../screens/MovieScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function ScreensWithTabs() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen
                    name="Timeline"
                    component={TimelineTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="AddPost" component={AddPostScreen} />
                <Stack.Screen name="AddReview" component={AddReviewScreen} />
                <Stack.Screen
                    name="ListDiscussions"
                    component={ListDiscussionsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Discussion"
                    component={DiscussionScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Post" component={PostScreen} />
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen
                    name="SearchMovie"
                    component={SearchMovieScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Movie" component={MovieScreen} />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />
            </Stack.Navigator>
            <CustomTabBar />
        </View>
    );
}
