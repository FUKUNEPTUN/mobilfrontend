import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
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
      
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)',paddingBottom:'3%'}}><StatusBar style="light" />
        
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{ flex: 1}}>
                  <Pressable onPress={() => this.props.navigation.navigate('Iroprofil', { aktualid: item.iro_id})}>
                  <ScrollView style={{ width: "85%", alignSelf: 'center' }}>
                    <View style={{ flex: 1,paddingTop:'1%',paddingBottom:"1%", marginBottom: 10,backgroundColor:"white",borderRadius:20,elevation:3}} >
                      <View style={{ flex: 1, alignSelf: 'center', width: "90%",paddingTop:"2%"}} >
                        <View style={{ flex: 1,borderWidth:3,alignItems:'center',width:80,alignSelf:'center',borderColor:'#15374B',borderRadius:100 }}><Image source={{ uri: IP.ipcim + item.iro_kep }} style={{ width: 75, height: 75, borderRadius:  300}} /></View>
                        <View style={{ marginLeft: 10, flex: 3 }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ color: 'darkred', fontSize: 28, textAlignVertical: 'center', textAlign: 'center', flex: 1 }}>{item.iro_neve}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
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