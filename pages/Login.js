import React, { Component,useEffect } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
const IP = require('../pages/IPcim')
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { Navigation } from 'react-native-navigation';
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
        <Image source={require('../assets/pics/konyvtargo.jpg')} style={{width:300,height:300, alignSelf:'center',marginTop:"20%"}} />  
        <TextInput placeholder='Email-cím' style={{alignSelf:'center',height:"7%",minHeight:62,width:"70%",backgroundColor:"white",borderRadius:10,elevation:7,fontSize:17,paddingLeft:"8%"}}/>
        <TextInput placeholder='Jelszó' style={{alignSelf:'center',height:"7%",minHeight:62,width:"70%",backgroundColor:"white",borderRadius:10,elevation:7,fontSize:17,marginTop:10,paddingLeft:"8%"}}/>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Root')} style={{ alignSelf: 'center',backgroundColor:"#15374B",minHeight:50,width:"50%",height:"6%", borderRadius:10,elevation:6,marginTop:"6%",marginBottom:"3%"}}>
          <Text style={{ alignSelf: 'center',height:"100%",textAlignVertical:"center",color:"white",fontSize:20, fontWeight:"600" }}>Bejelentkezés</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',alignSelf:"center"}} onPress={() => storeData("igen")}>
          <Text style={{ color:"grey" }}>Nincs még profilod?</Text>
          <Text style={{ color:"blue" }}>Regisztrálj!</Text>
        </TouchableOpacity>
        <StatusBar style="dark" />

      </View>
    );
  }
};
