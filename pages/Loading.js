import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
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
            <View style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)' }}>
                <Text style={{ alignSelf: 'center', paddingTop: 150 }}>
                    TÖLTÖK        </Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});