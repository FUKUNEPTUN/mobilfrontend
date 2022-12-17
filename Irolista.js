import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
const IP = require('./IPcim')


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      katt: true,
      datauzenet: [],
      iroid: 0
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
    this.getKonyv();
  }


  render() {
    const { data, isLoading, datauzenet } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)' }}>
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