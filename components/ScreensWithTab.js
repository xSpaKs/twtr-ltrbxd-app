import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "./Bars/CustomTabBar";
import TimelineTabs from "./Tabs/TimelineTabs";
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
import WatchlistScreen from "../screens/WatchlistScreen";
import SendMessageScreen from "../screens/SendMessageScreen";
import AddReplyScreen from "../screens/AddReplyScreen";

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
                    name="SearchMovie"
                    component={SearchMovieScreen}
                />
                <Stack.Screen name="Movie" component={MovieScreen} />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />
                <Stack.Screen name="Watchlist" component={WatchlistScreen} />
                <Stack.Screen
                    name="SendMessage"
                    component={SendMessageScreen}
                />
                <Stack.Screen name="AddReply" component={AddReplyScreen} />
            </Stack.Navigator>
            <CustomTabBar />
        </View>
    );
}
