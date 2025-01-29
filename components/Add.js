import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'

export default function Add({add}) {

    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('') // clear the input field
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TextInput
                style={styles.form}
                value={name}
                onChangeText={text => setName(text)}
                placeholder='Add item' 
                />
                <TouchableOpacity style={styles.button} onPress={save}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        paddingLeft: 16,
        paddingRight: 24,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center', // Keep input and button aligned
        marginBottom: 16,
    },
    form: {
        flex: 1, // Allows TextInput to take up available space without pushing the button offscreen
        flexShrink: 1, // Prevents TextInput from growing indefinitely
        minWidth: 150, // Ensures TextInput has a minimum width
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 8,
    },
    button: {
        marginLeft: 16,
        backgroundColor: "#f1f1f1",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        textAlign: "center",
    }
})