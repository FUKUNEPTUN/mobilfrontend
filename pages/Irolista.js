import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
const IP = require('../pages/IPcim')
import { StatusBar } from 'expo-status-bar';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      katt: true,
      datauzenet: [],
      iroid: 0
    };
  }

  async getIro() {
    try {
      this.setState({ isLoading: true })
      const response = await fetch(IP.ipcim + 'iro');
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getIro();
  }


  render() {
    const { data, isLoading, datauzenet } = this.state;

    return (
      
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)' }}><StatusBar style="light" />
      
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Pressable onPress={() => this.props.navigation.navigate('Iroprofil', { aktualid: item.iro_id})}>
                  <View style={{flexDirection: "row",paddingTop:5,paddingBottom:5}}>
                    <View style={{ flex: 1  }}><Image source={{ uri: IP.ipcim + item.iro_kep }} style={{ width:60, height: 60, borderRadius: 75, alignSelf: 'center' }} /></View>
                    <View style={{ flex: 2 }}><Text style={{fontSize: 25, color: '#4f0101',textAlignVertical:'center', height:60 }}>{item.iro_neve}</Text></View>
                  </View>
                  <View style={{
                    flex: 1, flexDirection: "row"
                  }}>
                    

                  </View>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});