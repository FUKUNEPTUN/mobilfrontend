import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, Pressable, TextInput, ScrollView } from 'react-native';
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
        
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)', paddingTop: "4%", }}>
      <StatusBar style="light" />

      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={datauzenet}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Pressable onPress={() => this.props.navigation.navigate('KonyvProfil', { konyvid: item.kp_id })} style={{ flex: 1 }}>
                <ScrollView style={{ width: "90%", alignSelf: 'center' }}>
                  <View style={{ flex: 1,paddingTop:'1%',paddingBottom:"1%",paddingLeft:'1%', marginBottom: 15,backgroundColor:"white",borderRadius:10,elevation:5}} >
                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', width: "90%" }} >
                      <View style={{ flex: 1 }}><Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 100, height: 150, alignSelf:'flex-end', borderRadius: 5 }} /></View>
                      <View style={{ marginLeft: 10, flex: 3 }}>
                        {item.alcim == "" ? 
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: 'darkred', fontSize: 20, textAlignVertical: 'center', textAlign: 'center', flex: 1 }}>{item.konyv_cime}</Text>
                        </View>:
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: 'darkred', fontSize: 20, textAlignVertical: 'bottom', textAlign: 'center', flex: 1 }}>{item.konyv_cime}</Text>
                          <Text style={{ fontWeight: '700', fontSize: 15, textAlignVertical: 'top', textAlign: 'center', flex: 1 }}>{item.alcim}</Text>
                        </View>}
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