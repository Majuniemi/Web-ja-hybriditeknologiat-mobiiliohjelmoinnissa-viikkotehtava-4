import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

export default function Add({ add }) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.form}
                value={name}
                onChangeText={text => setName(text)} placeholder="Enter task"
            />
            <Pressable style={styles.pressable} onPress={() => save(name)}>
                <Text style={styles.pressableText}>Save</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 8,
    },
    form: {
        fontSize: 24,
    },
    pressableText: {
        color: '#007AFF',
        fontSize: 24,
    }
});
