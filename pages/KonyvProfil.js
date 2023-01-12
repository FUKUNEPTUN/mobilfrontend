import React, { Component } from 'react';
import { ActivityIndicator, TextInput, FlatList, Text, View, Image, TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native';
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
            iroid: '0',
            konyvid: '3',

        };
    }
    tobb = () => {

        this.state.katt ? this.setState({ katt: false }) : this.setState({ katt: true })
    }
    konyv = async (valamiid) => {
        this.setState({ konyvid: valamiid })
        alert(valamiid)
        //uzenet backend végpont meghívása
        try {
            let adatok = {
                konyvid: valamiid
            }
            const response = await fetch(IP.ipcim + 'konyvprofil',
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
    }
    componentDidMount() {
        this.konyv(this.props.route.params.iddd);
    }


    render() {
        const { data, katt, isLoading, datauzenet, datauzenet2 } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={datauzenet}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1,
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 1, backgroundColor: "green" }}>
                                <Text style={{ textAlign: 'center', fontSize: 15, paddingBottom: 15 }}>{item.konyv_cime}</Text>
                                <Image source={{ uri: IP.ipcim + item.kp_kep }} style={{ width: 150, height: 200, alignSelf: 'center' }} />
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});