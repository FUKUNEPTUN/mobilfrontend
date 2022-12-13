import * as React from 'react';
import { Button, View,ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Iroprofil from './Iroprofil'
import Irolista from './Irolista'
import { NavigationContainer } from '@react-navigation/native';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Iroprofil')}
        title="Go to notifications"
      />
    </View>
  );
}
function Irolista_lap({ navigation }) {
  return (
    <Irolista navigation={navigation}/>
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
  <Drawer.Screen name="Home" component={HomeScreen} />
  <Drawer.Screen name="Notifications" component={NotificationsScreen} />
  <Drawer.Screen name="Minden író" component={Irolista_lap} />
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
  name="Root"
  component={Root}
  options={{ headerShown: false }}
/>
<Stack.Screen name="Iroprofil" component={Iroprofil} options={{title:"Író profilja"}} />
</Stack.Navigator>
</NavigationContainer>

  );
}
