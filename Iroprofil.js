import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
const IP = require('./IPcim')

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      katt: true,
      datauzenet: [],
      iroid:0
    };
  }
  kattintas = async (valamiid) => {
    this.setState({ iroid: valamiid })
    alert(valamiid)
    //uzenet backend végpont meghívása
    try {
      let adatok = {
        bevitel1: valamiid
      }
      
      const response = await fetch(IP.ipcim + 'iroprofil',
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
  async getKonyv() {
    try {
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
    this.getKonyv();
  }


  render() {
    const { data, isLoading,datauzenet } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={()=>this.kattintas(item.iro_id)}>
                  <View style={{ borderColor: "blue", borderWidth: 2 }}>
                    <Image source={{ uri: IP.ipcim + item.iro_kep }} style={{ width: 300, height: 300, alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred', paddingBottom: 15 }}>{item.iro_neve}</Text>
                    {/* <Text style={{ textAlign: 'center', fontSize: 15, color: 'darkred',paddingBottom:15}}>{item.iro_leiras}</Text> */}
                  </View>
                </TouchableOpacity>
                <FlatList
            data={datauzenet}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                 <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred', paddingBottom: 15 }}>{item.konyv_cime}</Text>
              </View>
            )}
          />
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