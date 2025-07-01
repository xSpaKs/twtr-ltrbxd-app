// useApi.js
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { HOME_API_URL } from "@env";
import { goToLogin } from "../helpers/navigation.helper";

export function useApi() {
    const { logoutContext } = useAuth();

    const call = async (method, endpoint, data = {}, withAuth = false) => {
        try {
            const headers = {
                Accept: "application/json",
            };

            if (withAuth) {
                const token = await SecureStore.getItemAsync("token");
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
            }

            const config = {
                method: method.toLowerCase(),
                url: `${HOME_API_URL}/${endpoint}`,
                headers,
            };

            if (method.toLowerCase() === "get") {
                config.params = data;
            } else {
                config.data = data;
            }

            const response = await axios(config);
            return response.data;
        } catch (error) {
            if (
                error.response &&
                error.response.status === 403 &&
                error.response.data?.message?.includes("banned")
            ) {
                Alert.alert("Banned", error.response.data.message, [
                    {
                        text: "OK",
                        onPress: () => {
                            logoutContext();
                            goToLogin();
                        },
                    },
                ]);
            }
            throw error;
        }
    };

    return { call };
}
