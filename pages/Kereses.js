import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
const IP = require('./IPcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      keres: ''
    };
  }

  async getMovies() {
    try {
      const response = await fetch(IP.ipcim + 'osszes');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  kattintas = () => { 
   
       //alert(this.state.keres)

       var bemenet={
        bevitel1:this.state.keres
       
      }
fetch(IP.ipcim+'osszeskereso', {
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      //alert(JSON.stringify(responseJson))
      this.setState({
   
        data: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
      }
    
  

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, paddingTop: "13%", backgroundColor: 'rgb(245, 240, 230)' }}>
        <View style={{width:"90%",alignSelf:'center'}}>
        <TextInput
          style={{ height: 45, fontSize: 30,textAlign:'center',fontWeight:'bold' }}
          placeholder="Keress könyvet!"
          onChangeText={(beirtszoveg) => this.setState({ keres: beirtszoveg })}
          value={this.state.keres}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#15374B", margin: 5,borderRadius:10, height:45}}
          onPress={() => this.kattintas()}>
          <Text style={{color:'white',fontSize:20,height:"100%",textAlignVertical:'center',alignSelf:'center', fontWeight:'bold'}}>Keresés</Text>
        </TouchableOpacity>
        </View>
        <ScrollView>
        {isLoading ? <ActivityIndicator /> : (
          data.map(item =>
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