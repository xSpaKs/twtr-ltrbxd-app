import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import AppLayout from "../components/AppLayout";
import PostItem from "../components/PostItem";
import ReviewItem from "../components/ReviewItem";
import BasicTopBar from "../components/Bars/BasicTopBar";
import { goToPostDetail } from "../helpers/navigation.helper";
import { styles } from "../styles/AddReply.styles";
import { useApi } from "../api/useApi";

const AddReplyScreen = ({ route }) => {
    const { typeParent, parent } = route.params;
    const [content, setContent] = useState("I could not agree more !");
    const [loading, setLoading] = useState(false);
    const { call } = useApi();

    const handleSubmit = async () => {
        if (!content.trim()) {
            Alert.alert("Empty message", "You must write something.");
            return;
        }

        setLoading(true);

        try {
            const data = await call(
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
            goToPostDetail(data.id);
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

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Write your reply..."
                    multiline
                    value={content}
                    onChangeText={setContent}
                />

                <TouchableOpacity
                    style={[
                        styles.publishButton,
                        (!content.trim() || loading) && styles.buttonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={loading || !content.trim()}
                >
                    <Text style={styles.publishButtonText}>
                        {loading ? "PUBLISHING..." : "PUBLISH"}
                    </Text>
                </TouchableOpacity>
            </View>
        </AppLayout>
    );
};

export default AddReplyScreen;
