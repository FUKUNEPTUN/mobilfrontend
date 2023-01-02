import React, { Component } from 'react';
import { ActivityIndicator, TextInput, FlatList, Text, View, Image, TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native';
import KonyvProfil from './KonyvProfil'

const IP = require('../pages/IPcim')



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      katt: true,
      datauzenet: [],
      datauzenet2: [],
      iroid: '0'
    };
  }
  tobb = () => {

    this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
  }
  iroProfil = async (valamiid) => {
    this.setState({ iroid: valamiid })

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
    this.konyv(valamiid)
  }
  konyv = async (valamiid) => {
    //uzenet backend végpont meghívása
    try {
      let adatok = {
        bevitel1: valamiid
      }
      const response = await fetch(IP.ipcim + 'iroprofilkonyv',
        {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        }
      );
      const json = await response.json();
      //alert(JSON.stringify(json))
      //console.log(json)
      this.setState({ datauzenet2: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.iroProfil(this.props.route.params.aktualid);
  }


  render() {
    const { data, katt, isLoading, datauzenet, datauzenet2 } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={datauzenet}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Image source={{ uri: IP.ipcim + item.iro_kep }} style={{ width: 300, height: 300, alignSelf: 'center', borderRadius: 75 }} />
              <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred', paddingBottom: 15 }}>{item.iro_neve}</Text>
              <Pressable onPress={() => this.tobb()}>
                {this.state.katt ? <Text style={{ fontSize: 15, margin: 15, paddingBottom: 15, alignSelf: 'center', textAlignVertical: 'center' }}>{item.iro_leiras.substring(0, 300)} ...Tovább</Text> : <Text style={{ fontSize: 15, margin: 15, paddingBottom: 15, alignSelf: 'center', textAlignVertical: 'center' }}>{item.iro_leiras}</Text>}
              </Pressable>
              <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 15 }}>Könyvei</Text>
              <FlatList
                data={datauzenet2}
                renderItem={({ item }) => (
                  <View style={{
                    flex: 1,
                    flexDirection: "row"
                  }}>
                    <Pressable onPress={() => this.props.navigation.navigate('KonyvProfil', { iddd: item.kp_id })} style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: "green" }}>
                      <Text style={{ textAlign: 'center', fontSize: 15, paddingBottom: 15 }}>{item.konyv_cime}</Text>
                      <Text style={{ textAlign: 'center', fontSize: 15, paddingBottom: 15 }}>{item.kp_id}</Text>
                      <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 200, alignSelf: 'center' }} />
                    </View>
                    </Pressable>

                  </View>
                )}
              />
            </View>
          )}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});