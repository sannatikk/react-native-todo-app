import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native' // flatlist is a component to render lists
import Row from './components/Row'
import Add from './components/Add'
import { useEffect, useCallback, useReducer } from 'react'
import 'react-native-get-random-values' // needed for uuid, god knows why
import { v4 as uuidv4 } from 'uuid' // this is a library to generate unique ids for list items, note it needs to be this exact import
import AsyncStorage from '@react-native-async-storage/async-storage' // for storing list items in local storage
import InfoText from './components/InfoText'

const STORAGE_KEY = '@items_key'

// reducer function to handle state changes
const listReducer = (state, action) => { // state is the current state, action is the action to be performed

  switch (action.type) {  // switch case is easier to read than if else

    case 'ADD_ITEM':
      return [{ id: uuidv4(), name: action.payload, isStruckThrough: false }, ...state] // add new item to the top of the list
      // uuiv4 generates a unique id, payload is the name for data to be added
      // then spread operator ...state is used to copy the current state to a new array
      // the new item is added to the top of the list because it is first in the array
      // if the line was [...state, { id: uuidv4(), name: action.payload, isStruckThrough: false }], the new item would be added to the bottom of the list

    case 'TOGGLE_STRIKETHROUGH':
      let updatedList = state.map(item => // map function is used to iterate over each item in the list
        item.id === action.payload ? { ...item, isStruckThrough: !item.isStruckThrough } : item // if the item id matches the id of the item to be updated, toggle the strikethrough state
      )

      // move item to top/bottom based on its strikethrough state
      const index = updatedList.findIndex(item => item.id === action.payload) // find the index of the item to be moved
      const [movedItem] = updatedList.splice(index, 1) // remove the item from the list, 1 is the number of items to remove

      if (movedItem.isStruckThrough) {
        updatedList.push(movedItem) // if the item is marked as done, use push to move it to the bottom of the list
      } else {
        updatedList.unshift(movedItem) // if the item is not marked as done, use unshift to move it to the top of the list
      }

      return updatedList

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload) // filter function is used to remove the item with the matching id

    case 'SET_LIST':
      return action.payload // set the list to the payload

    default:
      return state  // if no action is matched, return the current state
  }
}

export default function App() {

  // useReducer is a hook that is used to manage state in a more complex way than useState
  // it takes a reducer function and an initial state as arguments
  // it returns an array with the current state and a dispatch function
  // the dispatch function is used to send actions to the reducer
  // the reducer then updates the state based on the action

  const [listItems, dispatch] = useReducer(listReducer, []) // listItems is the current state, listReducer is the reducer function, [] is the initial state

  useEffect(() => {
    loadListItems()
  }, [])

  useEffect(() => {
    saveListItems(listItems)
  }, [listItems])

  const addItem = useCallback(name => {
    dispatch({ type: 'ADD_ITEM', payload: name }) // dispatch an action to add an item to the list based on the name
  }, [])

  const loadListItems = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      dispatch({ type: 'SET_LIST', payload: json || [] }) // dispatch an action to set the list based on the json value, if the value is null, set the list to an empty array
    } catch (ex) {
      console.log(ex)
    }
  }

  const saveListItems = async (value) => {
    try {
      const json = JSON.stringify(value) // convert the list items to a json string, before this they were an array of objects
      await AsyncStorage.setItem(STORAGE_KEY, json) // save the list items to local storage
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>T O  D O</Text>
      <InfoText />
      <Add add={addItem} />
      <FlatList 
        data={listItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Row 
            item={item}
            dispatch={dispatch}
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
