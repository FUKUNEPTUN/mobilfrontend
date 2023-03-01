import React, { useEffect, useState } from 'react';
import { Button, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Mufajkonyv from './pages/Mufajkonyv';
import Iroprofil from './pages/Iroprofil';
import Irolista from './pages/Irolista';
import Fooldal from './pages/Fooldal';
import Login from './pages/Login';
import KonyvProfil from './pages/Konyvprofil';
import TagProfil from './pages/TagProfil';
import Loading from './pages/Loading';
import Kereses from './pages/Kereses';
import Foryou from './pages/Foryou';
import Kotelezo from './pages/Kotelezo'
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
function Kereses_lap({ navigation }) {
  return (
    <Kereses navigation={navigation}/>
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
function Foryou_lap({ navigation }) {
  return (
    <Foryou navigation={navigation} />
  );
}
function Kotelezo_lap({ navigation }) {
  return (
    <Kotelezo navigation={navigation} />
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
      tabBarLabelStyle: {
        fontSize: 15,
      },
      tabBarIconStyle:{
        size:15
      },
      headerTitleAlign: "center",
      tabBarStyle: {
        height: 75,
        borderRadius:20,
        marginBottom:"2%",
        padding:"2%",
        paddingBottom:"2%",
        margin:"3%",
        paddingHorizontal: 5,
        paddingTop: 0,
        backgroundColor: '#0A1A23',
        position: 'absolute',
        borderTopWidth: 0,
      },
    }} >
      <Tab.Screen name="Fooldal" options={{
        tabBarLabel: 'KönyvtárGO',
        tabBarActiveTintColor:"#E6B794",tabBarInactiveTintColor:"white",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={32} />
        ),
      }} component={Fooldal_lap} />

<Tab.Screen name="Search" options={{
        tabBarLabel: 'Keresés',
        tabBarActiveTintColor:"#E6B794",tabBarInactiveTintColor:"white",
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book-search" color={color} size={32} />
        ),
      }} component={Kereses_lap} />

      <Tab.Screen name="Profil"
      options={{
        tabBarLabel: 'Profilom',
        tabBarActiveTintColor:"#E6B794",tabBarInactiveTintColor:"white",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={37} />
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
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0A1A23', },headerTintColor: '#FFFFFF'  }}>
        {isLoading ? isLogin1 ? <Stack.Screen name="Roo2t" component={Login_lap} options={{ headerShown: false }} /> : <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} /> : <Stack.Screen name='Loading_lap' component={Loading_lap} />}

        <Stack.Screen name='Mufajkonyv' component={Mufajkonyv} options={{ title: "Könyvek" }}/>
        <Stack.Screen name='KonyvProfil' component={KonyvProfil} options={{ title: "Könyv profilja" }}/>
        <Stack.Screen name='TagProfil' component={TagProfil} options={{ title: "Profilom" }}/>
        <Stack.Screen name='Mindenirok' component={Irolista} options={{ title: "Minden író" }}/>
        <Stack.Screen name="Iroprofil" component={Iroprofil} options={{ title: "Író profilja" }} />
        <Stack.Screen name="Foryou" component={Foryou} options={{ title: "Neked ajánljuk" }} />
        <Stack.Screen name="Kotelezo" component={Kotelezo} options={{ title: "Kötelező olvasmányok" }} />
      </Stack.Navigator>
    </NavigationContainer>

  );


}
