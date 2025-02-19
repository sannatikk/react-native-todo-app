import { StyleSheet, Text } from "react-native"
import React from "react"

export default function InfoText() {
    return (
        <Text style={styles.infoText}>
        Click an item to mark as done. Click again to undo.
        Permanently delete a done item by clicking the trash icon.
        </Text>
    )
}

const styles = StyleSheet.create({
    infoText: {
        color: "#666",
        fontSize: 14,
        padding: 16,
    },
})