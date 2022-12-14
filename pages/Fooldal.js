import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, View, Text, FlatList, ActivityIndicator, Pressable, Image } from 'react-native';
const IP = require('../pages/IPcim')


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            katt: true,
            datauzenet: [],
            iroid: 0
        };
    }

    async getMindenMufaj() {
        try {
            this.setState({ isLoading: true })
            const response = await fetch(IP.ipcim + 'mufaj');
            const json = await response.json();
            this.setState({ data: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.getMindenMufaj();
    }

    render() {
        const { data, isLoading, datauzenet } = this.state;
        return (
            <ScrollView style={{
                flex: 1,
            }}>
                <View style={{ flex: 1, minHeight: 400, backgroundColor: "red" }} />
                <View style={{ flex: 1, minHeight: 400, backgroundColor: "green" }} />
                <View style={{ flex: 1, minHeight: 400, backgroundColor: "blue" }} />
                <View style={{ flex: 1, minHeight: 400, backgroundColor: "red" }} />
                <View style={{ flex: 1, minHeight: 200, backgroundColor: "green" }}>
                    <Text>Műfajok</Text>
                    <ScrollView horizontal style={{ flex: 1}}>
                        {isLoading ? <ActivityIndicator /> : (
                            data.map(item =>
                                <View style={{
                                    flex: 1, flexDirection: "row", backgroundColor: "green"
                                }}>
                                    <Pressable onPress={() => this.props.navigation.navigate('Mufajkonyv',{mufajid:item.mufaj1})} style={{ flex: 1}}>
                                        <View style={{ flex: 1,}}>
                                            <Image source={{ uri: IP.ipcim + item.mufaj_kep }} style={{width: 200,margin:5, height: 200,borderRadius:5}} />
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        )}
                    </ScrollView>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});