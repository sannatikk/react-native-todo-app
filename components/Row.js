import { Text, StyleSheet, Pressable, View } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

export default function Row({ item, dispatch }) {


    return (
      <View style={styles.rowContainer}>
        <Pressable
          onPress={() => dispatch({ type: "TOGGLE_STRIKETHROUGH", payload: item.id })} // dispatch an action to toggle the strikethrough based on the item's id
          style={styles.row}
        >
          <Text style={[styles.itemText, item.isStruckThrough && styles.strikethrough]}>
            {item.name}
          </Text>
        </Pressable>
  
        {item.isStruckThrough && (
          <Ionicons
            name="trash"
            size={24}
            onPress={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })} // dispatch an action to remove the item based on the item's id
            style={styles.trashIcon}
          />
        )}
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
    maxWidth: "100%",
  },
  row: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#989ea6",
    flexShrink: 1,
    maxWidth: "100%",
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#808080",
  },
  trashIcon: {
    marginLeft: 12,
    color: "#808080",
  },
});