import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import Elso from './Elso';
import Konyv from './Konyv'

function HomeScreen({ navigation }) {
  return (
<View style={{flex:1,
      flexDirection: "column"
    }}>
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 1, backgroundColor: "darkorange" }} />
      <View style={{ flex: 1, backgroundColor: "green" }} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
function Elso_lap({ navigation }) {
  return (
<Elso/>
  );
}
function Konyv_lap({ navigation }) {
  return (
<Konyv/>
  );
}
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home" screenOptions={{ drawerActiveBackgroundColor:'#ccb399',drawerActiveTintColor:'#201b17',headerStyle:{backgroundColor:'#f3ece5',height:100},drawerStyle:{backgroundColor: '#f3ece5', width: 300} 
      }} >
        <Drawer.Screen name="Főoldal" component={HomeScreen} />
        <Drawer.Screen name="Értesítések" component={NotificationsScreen} />
        <Drawer.Screen name="Első menü" component={Elso_lap} />
        <Drawer.Screen name="Írók" component={Konyv_lap} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
