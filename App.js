import * as React from 'react';
import { Button, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Mufajkonyv from './pages/Mufajkonyv';
import Iroprofil from './pages/Iroprofil';
import Irolista from './pages/Irolista';
import Fooldal from './pages/Fooldal';
import Login from './pages/Login';
import KonyvProfil from './pages/KonyvProfil';
import { NavigationContainer } from '@react-navigation/native';


function HomeScreen({ navigation }) {
  return (
    <Fooldal />
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
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Fooldal" options={{ title: "Főoldal" }} component={Fooldal_lap} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Mindeniro" options={{ title: "Minden író" }} component={Irolista_lap} />
    </Drawer.Navigator>
  );
}
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Roo2t"
          component={Login_lap}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Mufajkonyv'  component={Mufajkonyv} />
        <Stack.Screen name='KonyvProfil' component={KonyvProfil} />
        <Stack.Screen name="Iroprofil" component={Iroprofil} options={{ title: "Író profilja" }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
