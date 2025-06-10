import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/API";
import { useAuth } from "./AuthContext";

const MovieContext = createContext({
    movies: [],
    reload: () => {},
});

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const { token } = useAuth();

    const fetchMovies = async () => {
        try {
            const data = await API.call("get", "movies", {}, true);
            setMovies(data);
        } catch (error) {
            console.error("Erreur lors du chargement des films :", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchMovies();
        }
    }, [token]);

    return (
        <MovieContext.Provider value={{ movies, reload: fetchMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovies = () => useContext(MovieContext);
