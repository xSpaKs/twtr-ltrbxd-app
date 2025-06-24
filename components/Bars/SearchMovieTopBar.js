import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchMovieTopBar = ({ title, nextUrl }) => {
    const navigation = useNavigation();
    const goToAddPost = () => {
        navigation.navigate("AddPost", { movieId: null });
    };

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backIcon}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#555"
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
                {nextUrl == "AddPost" && (
                    <TouchableOpacity onPress={goToAddPost}>
                        <Text style={styles.noMovie}>No movie</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginTop: 4,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        padding: 4,
        marginRight: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    noMovie: {
        color: "blue",
    },
});

export default SearchMovieTopBar;
