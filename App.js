import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import Row from './components/Row'
import Add from './components/Add'
import { useState, useEffect, useCallback } from 'react'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InfoText from './components/InfoText'

const STORAGE_KEY = '@items_key'

export default function App() {
  const [data, setData] = useState([])

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
      isStruckThrough: false, // flag to track strikethrough state
    }
    setData((prevData) => [newItem, ...prevData])
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
                isStruckThrough: !item.isStruckThrough, // toggle strikethrough
            }
        }
        return item
    })

    // move the item based on strikethrough state
    const itemIndex = updatedData.findIndex(item => item.id === id);
    const [movedItem] = updatedData.splice(itemIndex, 1) // remove item

    if (movedItem.isStruckThrough) {
        // move item to the bottom if strikethrough is applied
        updatedData.push(movedItem);
    } else {
        // move item to the top if strikethrough is removed
        updatedData.unshift(movedItem);
    }

    setData(updatedData) // update the state with the new order
}

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>To-Do App</Text>
    <InfoText />
    <Add add={add} />
    <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Row 
          item={item}
          data={data}
          setData={setData}
          toggleStrikethrough={toggleStrikethrough}
        />
      )}
    />
  </SafeAreaView>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginTop: 50,
    marginBottom: 20,
  },
})