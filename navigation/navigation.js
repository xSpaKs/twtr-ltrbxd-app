import {
    createNavigationContainerRef,
    StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function push(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(name, params));
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}
