import { HOME_API_URL, SCHOOL_API_URL, SHARE_API_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

class API {
    static BASE_URL = HOME_API_URL;

    static async call(method, endpoint, data = {}, withAuth = false) {
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
            if (error.response) {
                console.error(
                    `${method} ${endpoint} ERROR (${error.response.status}):`,
                    error.response.data
                );
            } else if (error.request) {
                console.error(
                    `${method} ${endpoint} ERROR (no response):`,
                    error.request
                );
            } else {
                console.error(
                    `${method} ${endpoint} ERROR (config):`,
                    error.message
                );
            }

            throw error;
        }
    }
}

export default API;
