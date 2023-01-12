import React, { Component } from 'react';
import { ActivityIndicator, TextInput, FlatList, Text, View, Image, TouchableOpacity, StyleSheet, Button, Pressable, SafeAreaView, ScrollView } from 'react-native';
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
            const response = await fetch(IP.ipcim + 'tagprofil',
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
componentDidMount(){

}
    konyv = async (valamiid) => {
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                bevitel1: valamiid
            }
            const response = await fetch(IP.ipcim + 'tagprofilkonyv',
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
    updateFoglalas = async (valamiid) => {
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                bevitel1: valamiid
            }
            const response = await fetch(IP.ipcim + 'foglalasupdate',
                {
                    method: "POST",
                    body: JSON.stringify(adatok),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                }
            );
            const json = await response.json();
            // alert(JSON.stringify(json))

        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
            this.konyv(valamiid)
        }
    }
    componentDidMount() {
        this.iroProfil(1);
    }


    render() {
        const { data, katt, isLoading, datauzenet, datauzenet2 } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    {isLoading ? <ActivityIndicator /> : (
                        datauzenet.map(item =>
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: IP.ipcim + item.tp_profkep }} style={{ width: 220, height: 220, alignSelf: 'center', borderRadius: 150 }} />
                                <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 15 }}>{item.tp_felhasznalonev}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 25, color: 'grey', paddingBottom: 15 }}>{item.tp_nev}</Text></View>
                        )
                    )}
                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'grey', paddingBottom: 15 }}>kölcsönzéseid</Text>

                    {isLoading ? <ActivityIndicator /> : (
                        datauzenet2.map(item =>
                            <View style={{ flex: 1, backgroundColor: 'white' }}>
                                <Pressable onPress={() => this.updateFoglalas()}>
                                <Text style={{ textAlign: 'center', fontSize: 15, color: 'grey', paddingBottom: 15 }}>{item.k_kezdet.substring(0, 10) + "-től " + item.k_lejar.substring(0, 10) + "-ig"}</Text>

                                    <Text>Módosit</Text>
                                </Pressable>
                            </View>
                        )
                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});