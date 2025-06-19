import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRatingInput = ({
    rating,
    setRating,
    max = 5,
    size = 24,
    color = "#FFD700",
}) => {
    const handlePress = (value) => {
        if (rating === value - 0.5) {
            setRating(value);
        } else if (rating >= value) {
            setRating(value - 0.5);
        } else {
            setRating(value);
        }
    };

    return (
        <View style={{ flexDirection: "row" }}>
            {Array.from({ length: max }).map((_, i) => {
                const index = i + 1;
                let iconName = "star-outline";
                if (rating >= index) iconName = "star";
                else if (rating >= index - 0.5) iconName = "star-half";

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(index)}
                    >
                        <Ionicons name={iconName} size={size} color={color} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default StarRatingInput;
