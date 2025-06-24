import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MoviePostTimeline from "../Timelines/Posts/MoviePostTimeline";
import MovieReviewTimeline from "../Timelines/Reviews/MovieReviewTimeline";

const TopTab = createMaterialTopTabNavigator();

export default function MovieTabs({ movieId }) {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarIndicatorStyle: { backgroundColor: "#000" },
                tabBarStyle: { backgroundColor: "#fff" },
            }}
        >
            <TopTab.Screen
                name="MovieReviews"
                component={MovieReviewTimeline}
                options={{ title: "Popular reviews" }}
                initialParams={{ movieId }}
            />
            <TopTab.Screen
                name="MoviePosts"
                component={MoviePostTimeline}
                options={{ title: "Popular posts" }}
                initialParams={{ movieId }}
            />
        </TopTab.Navigator>
    );
}
