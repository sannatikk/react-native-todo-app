import { Text, StyleSheet, Pressable, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Row({ item, selectedId, select, data = [], setData, toggleStrikethrough }) {
  
  // Function to handle item removal
  const remove = () => {
    if (data && Array.isArray(data)) {
      const updatedData = data.filter((currentItem) => currentItem.id !== item.id);
      setData(updatedData); // Update the list of items
    } else {
      console.error("Data is not an array or is undefined");
    }
  };

  return (
    <View style={styles.rowContainer}>
      <Pressable
        onPress={() => {
          toggleStrikethrough(item.id); // Toggle strikethrough
          select(item.id); // Optionally select item if needed
        }}
        style={styles.row}
      >
        <Text
          style={[styles.itemText, item.isStruckThrough && styles.strikethrough]}
        >
          {item.name}
        </Text>
      </Pressable>

      {/* Show trash icon only if the item is struck-through */}
      {item.isStruckThrough && (
        <Ionicons
          name="trash"
          size={24}
          onPress={remove} // Call remove function
          style={styles.trashIcon}
        />
      )}
    </View>
  );
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
    marginLeft: 12, // Space between text and trash icon
    color: "#808080",
  },
});