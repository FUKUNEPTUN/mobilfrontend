import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image, Modal, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
            datauzenet3: [],
            tagprofil: '0',
            modalVisible: false,
        };
    }
    tobb = () => {

        this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
    }
    tagProfil = async (valamiid) => {
        this.setState({ tagprofil: valamiid })
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                tagprofilid: valamiid
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
        this.kedvenc(valamiid)
    }
    componentDidMount() {
        this.tagProfil(1)
    }
    konyv = async (valamiid) => {
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                tagprofilid: valamiid
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
    kedvenc = async (valamiid) => {
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                tagprofilid: valamiid
            }
            const response = await fetch(IP.ipcim + 'kedvenckonyv',
                {
                    method: "POST",
                    body: JSON.stringify(adatok),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                }
            );
            const json = await response.json();
            //alert(JSON.stringify(json))
            //console.log(json)
            this.setState({ datauzenet3: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }
    updateFoglalas = async (tagprofilid, kolcsid) => {
        //uzenet backend végpont meghívása
        alert(kolcsid)
        try {
            let adatok = {
                tagprofilid: tagprofilid,
                kolcsid: kolcsid
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
        this.tagProfil(1);
    }


    render() {
        const { data, datauzenet3, isLoading, datauzenet, datauzenet2, modalVisible } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 45, backgroundColor: 'rgb(245, 240, 230)', }}>
                <ScrollView>
                    {isLoading ? <ActivityIndicator /> : (
                        datauzenet.map(item =>
                            <View style={{ flex: 1, backgroundColor: "white", width: "90%", alignSelf: "center", borderRadius: 10, elevation: 10, padding: 20 }}>
                                <View style={{ backgroundColor: "white", elevation: 10, borderRadius: 150, width: 150, height: 150, alignSelf: 'center' }}><Image source={{ uri: IP.ipcim + item.tp_profkep }} style={{ alignSelf: 'center', borderRadius: 150, height: 150, width: 150, resizeMode: 'center' }} /></View>
                                <Text style={{ textAlign: 'center', fontSize: 30, paddingBottom: 5 }}>{item.tp_felhasznalonev}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 25, color: 'grey', paddingBottom: 5 }}>{item.tp_nev}</Text>
                            </View>
                        )
                    )}
                    <View style={{ flex: 1, alignSelf: "center", borderRadius: 10, marginTop: 20, backgroundColor: "white", height: 170, width: "90%", elevation: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            Kedvence műfjaid
                        </Text>
                        <View style={{ flex: 5, flexDirection: "row", }}>
                            {isLoading ? <ActivityIndicator /> : (
                                datauzenet3.map(item =>
                                    <View style={{ flex: 1, alignSelf: "center", borderRadius: 10 }}>
                                        <View style={{ alignSelf: 'center' }}><Image source={{ uri: IP.ipcim + item.mufaj_kep }} style={{ alignSelf: 'center', height: 115, width: 115, borderRadius: 5, resizeMode: 'center' }} /></View>
                                    </View>
                                )
                            )}
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Kolcsonzes')} style={{ flexDirection: "row", height: 60, width: "90%", elevation: 10, backgroundColor: "white", alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>
                        <View style={{ flex: 4, borderRadius: 10 }}>
                            <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 30, fontSize: 20 }}>Kölcsönzéseid</Text>
                        </View>
                        <View style={{ flex: 1, borderRadius: 10 }}>
                            <MaterialIcons style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} size={30} name="arrow-forward-ios" color={"black"} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Roo2t')} style={{ flexDirection: "row", height: 60, width: "90%", elevation: 10, backgroundColor: "#f7a8a8", alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>
                        <View style={{ flex: 4, borderRadius: 10 }}>
                            <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 30, fontSize: 20 }}>Kijelentkezés</Text>
                        </View>
                        <View style={{ flex: 1, borderRadius: 10 }}>
                            <MaterialIcons style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} size={30} name="logout" color={"black"} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 200, width: "90%", alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>

                    </View>
                    
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