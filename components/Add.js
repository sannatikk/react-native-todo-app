import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Keyboard } from 'react-native'

export default function Add({add}) {

    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('') // clear the input field
        Keyboard.dismiss() // hide the keyboard
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
        borderColor: "#989ea6",
        borderRadius: 5,
        padding: 8,
        backgroundColor: "#fff",
    },
    button: {
        marginLeft: 16,
        backgroundColor: "#cfd6e3",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#989ea6",
        borderRadius: 5,
    },
    buttonText: {
        color: "#000",
        textAlign: "center",
    }
})