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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      headerTitleAlign: "center",
      tabBarStyle: {
        height: "7%",
        paddingHorizontal: 5,
        paddingTop: 0,
        backgroundColor: '#4D0900',
        position: 'absolute',
        borderTopWidth: 0,
      },
    }} >
      <Tab.Screen name="Fooldal" options={{
        tabBarLabel: 'KönyvtárGO',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} component={Fooldal_lap} />

<Tab.Screen name="Search" options={{
        tabBarLabel: 'Keresés',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book-search" color={color} size={size} />
        ),
      }} component={Fooldal_lap} />

      <Tab.Screen name="Profil"
      options={{
        tabBarLabel: 'Profilom',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
      
      
      component={TagProfil_lap} />
    </Tab.Navigator>
  );
}
const Tab = createBottomTabNavigator();
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
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#4D0900' } }}>
        {isLoading ? isLogin1 ? <Stack.Screen name="Roo2t" component={Login_lap} options={{ headerShown: false }} /> : <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} /> : <Stack.Screen name='Loading_lap' component={Loading_lap} />}

        <Stack.Screen screenOptions={{ headerStyle: { backgroundColor: '#4D0900', } }} name='Mufajkonyv' component={Mufajkonyv} />
        <Stack.Screen screenOptions={{ headerStyle: { backgroundColor: '#4D0900' } }} name='KonyvProfil' component={KonyvProfil} />
        <Stack.Screen screenOptions={{ headerStyle: { backgroundColor: '#4D0900' } }} name='TagProfil' component={TagProfil} />
        <Stack.Screen screenOptions={{ headerStyle: { backgroundColor: '#4D0900' },headerTintColor: '#FFFFFF'  }} name='Mindenirok' component={Irolista} />
        <Stack.Screen screenOptions={{ headerStyle: { backgroundColor: '#4D0900' } }} name="Iroprofil" component={Iroprofil} options={{ title: "Író profilja" }} />

      </Stack.Navigator>
    </NavigationContainer>

  );


}
