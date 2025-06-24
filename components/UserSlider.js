import React from "react";
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserSlider = ({ users }) => {
    const navigation = useNavigation();
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {users.map((user) => (
                <TouchableOpacity
                    key={user.id}
                    onPress={() =>
                        navigation.navigate("Profile", {
                            id: user.id,
                        })
                    }
                    style={styles.avatarWrapper}
                >
                    <Image
                        source={{ uri: user.profile_picture_url }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    avatarWrapper: {
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#ccc",
    },
});

export default UserSlider;
