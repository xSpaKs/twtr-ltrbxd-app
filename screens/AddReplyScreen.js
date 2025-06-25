import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import API from "../api/API";
import AppLayout from "../components/AppLayout";
import PostItem from "../components/PostItem";
import ReviewItem from "../components/ReviewItem";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { useNavigation } from "@react-navigation/native";

const AddReplyScreen = ({ route }) => {
    const { typeParent, parent } = route.params;
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (!content.trim()) {
            Alert.alert("Empty message", "You must write something.");
            return;
        }

        setLoading(true);

        try {
            const data = await API.call(
                "post",
                "posts",
                {
                    content,
                    post_id: typeParent == "post" ? parent.id : null,
                    review_id: typeParent == "review" ? parent.id : null,
                    movie_id: null,
                },
                true
            );

            navigation.navigate("Post", { postId: data.id });
        } catch (error) {
            Alert.alert("", "Unable to send your post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <BasicTopBar title={"Publish a comment"} />

            <View style={styles.parentPreview}>
                {typeParent === "review" ? (
                    <ReviewItem review={parent} />
                ) : (
                    <PostItem post={parent} />
                )}
            </View>

            <KeyboardAvoidingView
                style={styles.inputWrapper}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <TextInput
                    style={styles.textInput}
                    placeholder="Write your reply..."
                    multiline
                    value={content}
                    onChangeText={setContent}
                />

                <Button
                    style={styles.publishButton}
                    title={loading ? "Publishing..." : "Publish"}
                    onPress={handleSubmit}
                    disabled={loading || !content.trim()}
                />
            </KeyboardAvoidingView>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    parentPreview: {
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc",
    },
    inputWrapper: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 6,
        justifyContent: "flex-start",
    },
    textInput: {
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: "top",
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    publishButton: {
        paddingVertical: 10,
    },
});

export default AddReplyScreen;
