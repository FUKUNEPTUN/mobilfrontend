import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text,SafeAreaView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Iroprofil from './pages/Iroprofil'
const IP = require('./IPcim')

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      datauzenet: [],
      isLoading: true,
      katt: true,
      iroID: 1
    };
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
  kattintas = async (valamiid) => {
    this.setState({ iroID: valamiid })
    alert(valamiid)
    //uzenet backend végpont meghívása
    try {
      let adatok = {
        bevitel1: valamiid
      }
      const response = await fetch(IP.ipcim + 'irokonyv',
        {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        }
      );
      const json = await response.json();
      //alert(JSON.stringify(json))
      console.log(json)
      this.setState({ datauzenet: json });
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
    const { data, isLoading } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ iro_id }, index) => iro_id}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.kattintas(item.iro_id)}
                >
                  <View style={{ borderColor: "blue", borderWidth: 2 }}>
                    <Image source={{ uri: IP.ipcim + item.iro_kep }} style={{ width: 300, height: 300, alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred', paddingBottom: 15 }}>{item.iro_neve}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'darkred', paddingBottom: 15 }}>{item.iro_leiras}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});