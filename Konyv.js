import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async getKonyv() {
    try {
      const response = await fetch('http://192.168.6.12:3000/konyv');
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
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, paddingTop: 35, paddingLeft: 10 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{borderColor:"blue", borderWidth:2}}>
                <Image style={{ alignSelf: 'center', width: 200, height: 300 }} source={{ uri: 'http://192.168.6.12:3000/' + item.konyv_kep}} />
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred' }}>{item.konyv_kep}</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred' }}>{item.konyv_nev}</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred' }}>{item.iro_nev}</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred' }}>{item.mufaj_nev}</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred' }}>{item.konyv_oldalszam}</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred' }}>{item.konyv_kiadaseve}</Text>
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