import { API_URL } from "@env";
import axios from "axios";

class API {
    static BASE_URL = "http://192.168.1.96:8000/api";

    static defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    static async get(endpoint, params = {}) {
        try {
            const response = await axios.get(`${this.BASE_URL}/${endpoint}`, {
                headers: this.defaultHeaders,
                params,
            });
            return response.data;
        } catch (error) {
            console.error("GET error:", error);
            throw error;
        }
    }

    static async post(endpoint, data = {}) {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/${endpoint}`,
                data,
                {
                    headers: this.defaultHeaders,
                }
            );
            return response.data;
        } catch (error) {
            console.error("POST error:", error);
            throw error;
        }
    }

    static async put(endpoint, data = {}) {
        try {
            const response = await axios.put(
                `${this.BASE_URL}/${endpoint}`,
                data,
                {
                    headers: this.defaultHeaders,
                }
            );
            return response.data;
        } catch (error) {
            console.error("PUT error:", error);
            throw error;
        }
    }

    static async delete(endpoint) {
        try {
            const response = await axios.delete(
                `${this.BASE_URL}/${endpoint}`,
                {
                    headers: this.defaultHeaders,
                }
            );
            return response.data;
        } catch (error) {
            console.error("DELETE error:", error);
            throw error;
        }
    }
}

export default API;
