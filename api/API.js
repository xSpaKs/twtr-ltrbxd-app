import { HOME_API_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

class API {
    static BASE_URL = HOME_API_URL;

    static defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    static async call(method, endpoint, data = {}, withAuth = false) {
        try {
            const headers = this.defaultHeaders;
            if (withAuth) {
                const token = await SecureStore.getItemAsync("token");
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
            }

            const config = {
                method: method.toLowerCase(),
                url: `${this.BASE_URL}/${endpoint}`,
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
            console.error(method + " ERROR : ", error);
            throw error;
        }
    }
}

export default API;
