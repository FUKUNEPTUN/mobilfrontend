import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image, Modal, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
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
            tagprofil: '0'
        };
    }
    tobb = () => {

        this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
    }
    iroProfil = async (valamiid) => {
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
    }
    componentDidMount() {
        this.iroProfil(1)
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
                                <Pressable onPress={() => this.updateFoglalas(item.tp_id, item.k_id)}>
                                    <Text>{item.k_id}</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 15, color: 'grey', paddingBottom: 15 }}>{item.k_kezdet.substring(0, 10) + "-től " + item.k_lejar.substring(0, 10) + "-ig"}</Text>
                                    <Text>Módosit</Text>
                                </Pressable>
                            </View>
                        )
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            this.setState({ modalVisible: !modalVisible });
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hello World!</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setState({ modalVisible: !modalVisible })}>
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </Pressable>
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