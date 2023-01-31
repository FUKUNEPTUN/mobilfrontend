import React, { useEffect, useState } from 'react';
import { Button, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Mufajkonyv from './pages/Mufajkonyv';
import Iroprofil from './pages/Iroprofil';
import Irolista from './pages/Irolista';
import Fooldal from './pages/Fooldal';
import Login from './pages/Login';
import KonyvProfil from './pages/KonyvProfil';
import TagProfil from './pages/TagProfil';
import Loading from './pages/Loading'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  return (
    <Fooldal />
  );
}
function Loading_lap({ navigation }) {
  return (
    <Loading />
  );
}
function Irolista_lap({ navigation }) {
  return (
    <Irolista navigation={navigation} />
  );
}
function Fooldal_lap({ navigation }) {
  return (
    <Fooldal navigation={navigation} />
  );
}
function TagProfil_lap({ navigation }) {
  return (
    <TagProfil navigation={navigation} />
  );
}
function Login_lap({ navigation }) {
  return (
    <Login navigation={navigation} />
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Root({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home"  screenOptions={{headerStyle: { backgroundColor: '#4D0900' }, headerTintColor: '#FFFFFF', drawerStyle: { backgroundColor: '#740101' }, drawerActiveBackgroundColor: "rgb(18,18,18)", drawerActiveTintColor: "white", drawerInactiveTintColor: "white", headerTitleAlign: "center" }}>
      <Drawer.Screen name="Fooldal" options={{ title: "Főoldal" }}  screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} component={Fooldal_lap} />
      <Drawer.Screen name="Notifications" screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} component={NotificationsScreen} />
      <Drawer.Screen name="Mindeniro" screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} options={{ title: "Minden író" }} component={Irolista_lap} />
      <Drawer.Screen name="Profil" screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} options={{ title: "Profilom" }} component={TagProfil_lap} />
    </Drawer.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()
export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [isLogin1, setLogin1] = useState(false);
  const isLogin = async (isLogin) => {
    try {
      const value = await AsyncStorage.getItem(isLogin)
      if (value !== null) {
        if (value == "igen") {

          setLogin1(false)
        }
        else {
          setLogin1(true)
        }
      }
    } catch (e) {
      // error reading value
    }
    finally {
      setLoading(true);
    }
  }

  isLogin("@bejelentkezve")
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}}>
        {isLoading ? isLogin1 ? <Stack.Screen name="Roo2t" component={Login_lap} options={{ headerShown: false }} /> : <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} /> : <Stack.Screen name='Loading_lap' component={Loading_lap} />}

        <Stack.Screen screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} name='Mufajkonyv' component={Mufajkonyv} />
        <Stack.Screen screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} name='KonyvProfil' component={KonyvProfil} />
        <Stack.Screen  screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} name='TagProfil' component={TagProfil} />
        <Stack.Screen screenOptions={{headerStyle: { backgroundColor: '#AC0000' }}} name="Iroprofil" component={Iroprofil} options={{ title: "Író profilja" }} />

      </Stack.Navigator>
    </NavigationContainer>

  );


}
