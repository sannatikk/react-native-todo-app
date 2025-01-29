import { StatusBar } from 'expo-status-bar'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import Row from './components/Row'
import Add from './components/Add'
import { useState, useEffect, useCallback, useMemo } from 'react'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@items_key'

export default function App() {
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    storeData(data)
  }, [data])

  const add = useCallback((name) => {
    const newItem = {
      id: uuidv4(), // unique id for each item
      name: name,
      isStruckThrough: false, // new flag to track strikethrough state
    }
    setData([newItem, ...data])
  }, [data])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        setData([])
      } else {
        setData(json)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async (value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const toggleStrikethrough = (id) => {
    const updatedData = data.map(item => {
        if (item.id === id) {
            return {
                ...item,
                isStruckThrough: !item.isStruckThrough, // Toggle strikethrough
            };
        }
        return item;
    });

    // Move the item based on the new strikethrough state
    const itemIndex = updatedData.findIndex(item => item.id === id);
    const [movedItem] = updatedData.splice(itemIndex, 1); // Remove the item

    if (movedItem.isStruckThrough) {
        // Move item to the bottom if strikethrough is applied
        updatedData.push(movedItem);
    } else {
        // Move item to the top if strikethrough is removed
        updatedData.unshift(movedItem);
    }

    setData(updatedData); // Update the state with the new order
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To Do</Text>
      <Add add={add} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Row
            item={item}
            selectedId={selectedId}
            select={setSelectedId}
            toggleStrikethrough={toggleStrikethrough} // Pass the function to toggle strikethrough
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginTop: 50,
    marginBottom: 20,
  },
})