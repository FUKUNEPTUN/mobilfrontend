import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
const IP = require('../pages/IPcim')
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            katt: true,
            datauzenet: [],
        };
    }

    render() {
        const { data, isLoading, datauzenet } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#f5f0e6',paddingVertical:"35%"}}>
                <Image source={require('../assets/pics/konyvtargo.gif')} style={{width:350,height:350,alignSelf:'center'}} />
                <Text style={{textAlign:"center",fontSize:50,fontWeight:'800'}}>Töltés </Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});