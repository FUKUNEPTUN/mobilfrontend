import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
const IP = require('./IPcim')

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      katt:true
    };
  }

  async getKonyv() {
    try {
      const response = await fetch(IP.ipcim+'iro');
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
      <View style={{ flex: 1}}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{flex:1}}>
              <TouchableOpacity>
              <View style={{borderColor:"blue", borderWidth:2}}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'darkred', paddingBottom:15 }}>{item.iro_neve}</Text>
                <Text style={{ textAlign: 'center', fontSize: 15, color: 'darkred',paddingBottom:15}}>{item.iro_leiras}</Text>
              </View>
              </TouchableOpacity>
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