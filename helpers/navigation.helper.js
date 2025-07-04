import { navigate, push, goBack } from "../navigation/navigation";

export const goToBack = () => {
    goBack();
};

export const goToLogin = () => {
    navigate("Login");
};

export const goToRegister = () => {
    navigate("Register");
};

export const goToPage = (url, param) => {
    navigate(url, param);
};

export const goToDiscussion = (id) => {
    navigate("Discussion", { discussionId: id });
};

export const pushToProfile = (id) => {
    push("Profile", { id });
};

export const goToProfile = (id) => {
    navigate("Profile", { id });
};

export const goToProfilePosts = (user) => {
    navigate("ProfilePosts", { user });
};

export const goToPostDetail = (id) => {
    push("Post", { postId: id });
};

export const goToTimeline = (refresh) => {
    navigate("Timeline", { refresh: refresh });
};

export const goToMovieDetail = (id) => {
    navigate("Movie", { movieId: id });
};

export const goToSearchMovie = (nextUrl) => {
    navigate("SearchMovie", { nextUrl: nextUrl });
};

export const goToListDiscussions = () => {
    navigate("ListDiscussions");
};

export const goToReviewDetail = (id) => {
    push("Review", {
        reviewId: id,
    });
};
export const goToAddReply = (typeParent, parent) => {
    navigate("AddReply", { typeParent: typeParent, parent: parent });
};

export const goToAddPost = (id) => {
    navigate("AddPost", { movieId: id });
};

export const goToWatchlist = (user, isOwnUser) => {
    navigate("Watchlist", { user, isOwnUser });
};

export const goToEditProfile = (user) => {
    navigate("EditProfile", { user });
};

export const goToSendMessage = (otherUser, followings, followers) => {
    navigate("SendMessage", { otherUser, followings, followers });
};

export const goToReport = (otherUser) => {
    navigate("Report", { otherUser });
};

export const goToForgottenPassword = () => {
    navigate("ForgotPassword");
};

export const goToVerifyResetCode = (email) => {
    navigate("VerifyResetCode", { email });
};

export const goToResetPassword = (email, code) => {
    navigate("ResetPassword", { email, code });
};
