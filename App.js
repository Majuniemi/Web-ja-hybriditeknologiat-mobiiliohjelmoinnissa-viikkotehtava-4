import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import Constants from 'expo-constants';
import Row from './components/Row';
import Add from './components/Add';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items-key'

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    storeData(data)
  }, [data])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setData(json)
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

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (ex) {
      console.log(ex)
    }
  }

  const add = useCallback((name) => {
    const newItem = {
      id: uuidv4(),
      name: name,
      completed: false,
    }
    const tempData = [...data, newItem]
    setData(tempData)
  }, [data])

  const toggleCompletion = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <GestureHandlerRootView>
        <Text style={styles.header}>Todo List</Text>
        <Add add={add} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Row
              item={item}
              toggleCompletion={toggleCompletion}
            />
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 16,
  },
});
