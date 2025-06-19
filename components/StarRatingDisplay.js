import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRatingDisplay = ({ rating, max = 5, size = 16, color = "black" }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const extraFull = rating - fullStars >= 0.75 ? 1 : 0;
    const totalFull = fullStars + extraFull;
    const totalHalf = hasHalfStar ? 1 : 0;
    const totalEmpty = max - totalFull - totalHalf;

    return (
        <View style={{ flexDirection: "row" }}>
            <Text style={styles.rate}>{Number(rating).toFixed(1)}</Text>
            {Array.from({ length: totalFull }).map((_, i) => (
                <Ionicons
                    key={`full-${i}`}
                    name="star"
                    size={size}
                    color={color}
                />
            ))}
            {hasHalfStar && (
                <Ionicons name="star-half" size={size} color={color} />
            )}
            {Array.from({ length: totalEmpty }).map((_, i) => (
                <Ionicons
                    key={`empty-${i}`}
                    name="star-outline"
                    size={size}
                    color={color}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    rate: {
        paddingRight: 6,
        fontWeight: "bold",
    },
});

export default StarRatingDisplay;
