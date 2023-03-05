import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
const IP = require('../pages/IPcim')
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
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
      <View style={{ flex: 1, backgroundColor: '#f5f0e6' }}>
        <Image source={require('../assets/pics/konyvtargo.jpg')} style={{width:300,height:300, alignSelf:'center'}} />  
        <TextInput placeholder='Add meg a neved' style={{alignSelf:'center',height:"7%",width:"70%",backgroundColor:"red"}}/>
        <TouchableOpacity onPress={() => storeData("igen")}>
          <Text style={{ alignSelf: 'center' }}>HÁJ</Text>
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