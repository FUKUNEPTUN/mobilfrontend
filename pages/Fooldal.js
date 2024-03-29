import React, { Component } from 'react';
import {StyleSheet, ScrollView, View, Text, ActivityIndicator, Pressable, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
    handleBackPress(){
        Alert.alert(
            'Kilépés',
            'Tényleg ki akarsz lépni?',
            [
                {
                    text:'mégsem',
                    onPress:()=>{
                        console.log('cancel pressed')
                    }
                },
                {
                    text:'Igen',
                    onPress:()=>BackHandler.exitApp(),
                },
            ],
            {
            cancelable:false},

        )
        return true;
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
        BackHandler.addEventListener('hardwareBackPress',this.handleBackPress)
    }


    render() {
        const { data, isLoading, datauzenet } = this.state;
        const storeData = async (value) => {
            alert(value)
            try {
                await AsyncStorage.setItem('@bejelentkezve', value)
            } catch (e) {
                // saving error
            }
        }

        return (
            
            <ScrollView style={{
                flex: 1,
                backgroundColor: 'rgb(245, 240, 230)',
                paddingTop:"9%",
                paddingBottom:"9%"
                
            }}>
 <StatusBar style="dark" />
            {/* -----------------------------------------------------------------FOR YOU--------------------------------------------------------------------------------------------------------- */}
                <View style={{ flex: 1, paddingTop: '6%' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Foryou')} style={{ backgroundColor: "white", height: 230, width: "90%", borderRadius: 15, alignSelf: 'center' ,elevation:6}}>
                        <Text style={{ padding: 20, fontWeight: '700', fontSize: 25 }}>Neked ajánljuk</Text>
                    </TouchableOpacity>
                </View>

            {/* ----------------------------------------------------------------HÁRMAS CSEMPE---------------------------------------------------------------------------------------------------------- */}

                <View style={{ flex: 1, paddingTop: 15, marginBottom: 15 }} >
                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', width: "90%" }} >
                        <TouchableOpacity style={{ flex: 1,backgroundColor: "white", height: 200, borderRadius: 15,elevation:6 }}>
                            <Text style={{ padding: 20, fontWeight: '700', fontSize: 25 }}>hármas csempe 1</Text>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10, flex: 1, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Mindenirok')}  style={{ backgroundColor: "white", flex:1, borderRadius: 15,elevation:6 }}>
                                <Text style={{ padding: 20, fontWeight: '700', fontSize: 15 }}>Minden író</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Kotelezo')} style={{ backgroundColor: "white", flex:1, marginTop: 10, borderRadius: 15,elevation:6 }}>
                                <Text style={{ padding: 20, fontWeight: '700', fontSize: 15 }}>Kötelező olvasmányok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            
            {/* ----------------------------------------------------------------KÖZELGŐ LEJÁRAT---------------------------------------------------------------------------------------------------------- */}

                <View style={{ flex: 1, marginBottom: 15}}>
                    {false ? <TouchableOpacity style={{ backgroundColor: "red", height: 100, width: "90%", borderRadius: 15, alignSelf: 'center' }}>
                        <Text style={{ padding: 20, fontWeight: '700', fontSize: 25 }}>Közelgő lejárat</Text>
                    </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: "green", height: 100, width: "90%", borderRadius: 15, alignSelf: 'center',elevation:6 }}>
                        <Text style={{ padding: 20, fontWeight: '700', fontSize: 25 }}>Közelgő lejárat</Text>
                    </TouchableOpacity>}

                </View>

            {/* ----------------------------------------------------------------MŰFAJOK---------------------------------------------------------------------------------------------------------- */}

                <View style={{ flex: 1, minHeight: 200,paddingBottom:"30%" }}>
                    <ScrollView horizontal style={{ flex: 1,width:"95%",alignSelf:"center"}} >
                        {isLoading ? <ActivityIndicator /> : (
                            data.map(item =>
                                <View style={{
                                    flex: 1, flexDirection: "row"
                                }}>
                                    <Pressable onPress={() => this.props.navigation.navigate('Mufajkonyv', { mufajid: item.mufaj1 })} style={{ flex: 1}}>
                                        <View style={{ flex: 1}}>
                                            <Image source={{ uri: IP.ipcim + item.mufaj_kep }} style={{width: 150,elevation:60, margin: 5, height: 150, borderRadius: 15 }} />
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