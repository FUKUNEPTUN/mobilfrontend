import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View,ScrollView, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
const IP = require('../pages/IPcim')
import AsyncStorage from '@react-native-async-storage/async-storage';
const isLogin = async (isLogin) => {
  try {
    const value = await AsyncStorage.getItem(isLogin)
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
const storeData = async (value) => {
  alert(value)
  try {
    await AsyncStorage.setItem('@bejelentkezve', value)
  } catch (e) {
    // saving error
  }
}
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      katt: true,
      datauzenet: [],
    };
  }

  render() {
    const { data, isLoading, datauzenet } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)'}}>
        <Text style={{alignSelf:'center',paddingTop:150}}>
          Login
        </Text>
        <TouchableOpacity  onPress={() => storeData("igen")}>
        <Text style={{alignSelf:'center'}}>HÁJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});