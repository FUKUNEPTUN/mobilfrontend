import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Image, Modal, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(245, 240, 230)', }}>
                <ScrollView>
                    {isLoading ? <ActivityIndicator /> : (
                        datauzenet2.map(item =>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <ScrollView style={{ width: "90%", alignSelf: 'center' }}>
                                        <View style={{ flex: 1, paddingTop: '1%', paddingBottom: "1%", paddingLeft: '1%', marginBottom: 15, backgroundColor: "white", borderRadius: 10, elevation: 5 }} >
                                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', width: "90%" }} >
                                                <Pressable onPress={() => this.props.navigation.navigate('KonyvProfil', { konyvid: item.kp_id })} style={{ flex: 1 }}><Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 100, height: 150, alignSelf: 'flex-end', borderRadius: 5 }} /></Pressable>
                                                <View style={{ marginLeft: 10, flex: 3 }}>
                                                    {item.alcim == "" ?
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ color: 'darkred', fontSize: 20, textAlignVertical: 'center', textAlign: 'center', flex: 1 }}>{item.konyv_cime}</Text>
                                                        </View> :
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ color: 'darkred', fontSize: 20, textAlignVertical: 'bottom', textAlign: 'center', flex: 1 }}>{item.konyv_cime}</Text>
                                                            <Text style={{ fontWeight: '700', fontSize: 15, textAlignVertical: 'top', textAlign: 'center', flex: 1 }}>{item.alcim}</Text>
                                                        </View>}
                                                    <View style={{ flexDirection: "row", backgroundColor: "#e8e8e8", borderRadius: 10 }}>
                                                        <View style={{ flex: 3 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'grey' }}>{item.k_kezdet.substring(0, 10) + "-től "}</Text>
                                                            <Text style={{ textAlign: 'center', fontSize: 15, color: 'grey', paddingBottom: 15 }}>{item.k_lejar.substring(0, 10) + "-ig"}</Text>
                                                        </View>
                                                        <Pressable style={{ flex: 1 }}
                                                            onPress={() => this.setState({ modalVisible: true })}>
                                                            <MaterialIcons style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }} size={30} name="mode-edit" color={"black"} />
                                                        </Pressable>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        )
                    )}
                    <StatusBar style="light" />
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setState({ modalVisible: !modalVisible });
                        }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 22,
                        }}>
                            <View style={{
                                marginTop:"60%",
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 20,
                                borderWidth:5,
                                borderColor:"black",
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,height:300
                            }}>
                                <Text style={{ fontSize:20 }}>Tényleg szeretnéd meghosszabbítani a kölcsönzésed 2 héttel?</Text>
                                <View style={{ flex: 1, paddingTop: 15, alignSelf: 'center', marginBottom: 15 }} >
                                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', width: "90%" }} >
                                        <Pressable
                                            style={{ backgroundColor: "#f7a8a8", width: "30%", height: 50, borderRadius: 10, marginRight: 15 }}
                                            onPress={() => this.setState({ modalVisible: !modalVisible })}>
                                            <Text style={{ alignSelf: 'center',height:"100%",textAlignVertical:"center" }}>Mégsem</Text>
                                        </Pressable>
                                        <Pressable
                                            style={{ backgroundColor: "#a4e8a2", width: "30%", height: 50, borderRadius: 10 }}
                                            onPress={() => this.setState({ modalVisible: !modalVisible })}>
                                            <Text style={{ alignSelf: 'center',height:"100%",textAlignVertical:"center" }}>Módosít</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
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