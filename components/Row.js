import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export default function Row({ item, toggleCompletion }) {

    return (
        <Pressable style={[styles.row]} onPress={() => toggleCompletion(item.id)}>
            <Text style={[styles.rowText, item.completed && styles.completed]}>
                {item.name}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    rowText: {
        fontSize: 24,
        marginBottom: 24,
    },
    completed: {
        textDecorationLine: 'line-through',
    },
});
