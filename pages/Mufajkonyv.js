import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
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
    };
  }

  mufajkonyv = async (valamiid) => {
    //uzenet backend végpont meghívása
    try {
      let adatok = {
        mufajid: valamiid
      }
      const response = await fetch(IP.ipcim + 'mufajkonyv',
        {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        }
      );
      const json = await response.json();
      //alert(JSON.stringify(json))
      //console.log(json)
      this.setState({ datauzenet: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.mufajkonyv(this.props.route.params.mufajid);
  }


  render() {
    const { data, isLoading, datauzenet } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)',paddingTop: "4%",}}>
        <StatusBar style="light" />

        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={datauzenet}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Pressable onPress={() => this.props.navigation.navigate('KonyvProfil', { konyvid: item.kp_id })} style={{ flex: 1 }}>
                  <ScrollView style={{width:"90%",alignSelf:'center'}}>
                    <View style={{ flex: 1 }}><Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 225, alignSelf: 'center', borderRadius: 5  }} /></View>
                    <View style={{ flex: 1 }}><Text style={{ fontSize: 30, color: 'darkred', textAlignVertical: 'center', textAlign: 'center'}}>{item.konyv_cime}</Text></View>
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