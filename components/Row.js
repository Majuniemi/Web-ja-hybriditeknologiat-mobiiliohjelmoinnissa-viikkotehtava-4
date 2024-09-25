import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Row({ item, selectedId, select, data, setData }) {
    const backgroundColor = item.id === selectedId ? '#f0f0f0' : '#fff';

    const remove = () => {
        const arrayWithoutRemoved = data.filter((item) => item.id !== selectedId)
        setData(arrayWithoutRemoved)
        select(null)
    }

    return (
        <Pressable style={[styles.row, , { backgroundColor }]} onPress={() => select(item.id)}>
            <Text style={styles.rowText}>{item.name}</Text>
            {
                item.id === selectedId && <Ionicons name="trash" size={24} onPress={() => remove()} />
            }
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
});
