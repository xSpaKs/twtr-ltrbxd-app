import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { goToAddPost, goToBack } from "../../helpers/navigation.helper";

const SearchMovieTopBar = ({ title, nextUrl }) => {
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            onPress={goToBack}
                            style={styles.backIcon}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
                {nextUrl == "AddPost" && (
                    <TouchableOpacity onPress={() => goToAddPost(null)}>
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
        backgroundColor: "#1C1C1E",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
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
        color: "white",
    },
    noMovie: {
        color: "gold",
    },
});

export default SearchMovieTopBar;
