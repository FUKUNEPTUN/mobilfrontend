import React, { Component } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)' }}>
        <FlatList
          data={datauzenet}
          renderItem={({ item }) => (
            <View style={{ flex: 1, paddingTop: "5%" }}>
              <View style={{ backgroundColor: "white", width: "90%", alignSelf: "center", elevation: 10, borderRadius: 15 }}>
                <Image source={{ uri: IP.ipcim + item.iro_kep }} style={{ width: 300, height: 300, alignSelf: 'center', borderRadius: 15 }} />
                <Text style={{ textAlign: 'center', fontSize: 35, color: 'darkred', paddingBottom: 15 }}>{item.iro_neve}</Text>
              </View>
              <View style={{ flex: 1, marginTop: 15, backgroundColor: 'white', marginBottom: 12, width: '90%', alignSelf: 'center', borderRadius: 10, elevation: 10 }} >
                <View style={{ margin: '2%' }}>
                  <Text style={{ textAlign: 'left', fontSize: 30, fontWeight: 'bold', paddingBottom: 10, fontWeight: 'bold' }}>Leírás</Text>
                  <Pressable onPress={() => this.tobb()}>
                    {this.state.katt ? <Text style={{ fontSize: 16, paddingBottom: 15, fontWeight: '800', color: '#5e5e5e' }}>{item.iro_leiras.substring(0, 300)} ...Tovább</Text> : <Text style={{ fontSize: 16, paddingBottom: 15, fontWeight: '800', color: '#5e5e5e' }}>{item.iro_leiras}</Text>}
                  </Pressable>
                </View>
              </View>

              <View style={{ backgroundColor: "#ede4d1" }}>
                <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 15 }}>Könyvei</Text>
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <FlatList
                    data={datauzenet2}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => this.props.navigation.navigate('KonyvProfil', { konyvid: item.kp_id })} style={{ flex: 1 }}>
                        <View style={{
                          flex: 1,
                        }}>
                          <View style={{ backgroundColor: "white", width: 170,paddingTop:10,paddingBottom:10,  margin: 5,borderRadius:15,elevation:10 }}>

                            <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150,borderRadius:15, height: 200, alignSelf: 'center' }} />
                            {
                              item.alcim!=""?<View>
                              <Text style={{ textAlign: 'center', fontSize: 20}}>{item.konyv_cime}</Text>
                              <Text style={{ textAlign: 'center', fontSize: 10}}>-</Text>
                              <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.alcim}</Text>
                            </View>:<Text style={{ textAlign: 'center', fontSize: 20}}>{item.konyv_cime}</Text>
                            }


                          </View>

                        </View>
                      </Pressable>


                    )}
                  />
                </View>

              </View>
            </View>
          )}
        />
        <StatusBar style="light" />

      </View>

    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});