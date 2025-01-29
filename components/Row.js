import { Text, StyleSheet, Pressable, View } from "react-native"
import React from "react"

export default function Row({ item, toggleStrikethrough }) {
  return (
    <View style={styles.rowContainer}>
      <Pressable onPress={() => toggleStrikethrough(item.id)} style={styles.row}>
        <Text style={[styles.itemText, item.isStruckThrough && styles.strikethrough]}>
          {item.name}
        </Text>
      </Pressable>
      
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 10,
    maxWidth: '100%',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    flexShrink: 1,
    maxWidth: '100%',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
})