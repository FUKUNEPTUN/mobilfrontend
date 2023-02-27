import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const IP = require('./IPcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      datauzenet:[],
      keres: ''
    };
  }

  tagProfil = async (valamiid) => {
    this.setState({ tagprofil: valamiid })
    //uzenet backend végpont meghívása
    try {
        let adatok = {
            tagprofilid: valamiid
        }
        const response = await fetch(IP.ipcim + 'foryou',
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
    this.tagProfil(1)
}

  render() {
    const { data, isLoading,datauzenet } = this.state;

    return (
        
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)' }}>
       <StatusBar style="light" />
        <ScrollView>
        {isLoading ? <ActivityIndicator /> : (
          datauzenet.map(item =>
            <View style={{ paddingBottom: 15 }}>
                <Text style={{ fontSize: 30, color: 'darkred', textAlign: 'center',paddingBottom:10,fontWeight:'bold' }}>{item.konyv_cime}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('KonyvProfil', { konyvid: item.kp_id })}>
                    <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 225, alignSelf: 'center', borderRadius: 5 }} />
                </TouchableOpacity>
            </View>
        )
        )}
        </ScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginLeft: 30,
    marginRight: 30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});