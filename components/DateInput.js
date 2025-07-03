import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInput({ initialDate, onDateChange }) {
    const [date, setDate] = useState(
        initialDate ? new Date(initialDate) : new Date()
    );
    const [showPicker, setShowPicker] = useState(false);

    const formattedDate = date.toLocaleDateString();

    const handleChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            onDateChange(selectedDate.toISOString());
        }
    };

    return (
        <View style={styles.dateRow}>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={handleChange}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dateText: {
        fontSize: 14,
    },
});
