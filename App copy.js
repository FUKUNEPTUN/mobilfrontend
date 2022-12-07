import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Elso from './Elso';
import Iro from './Iro'
import Iroprofil from './Iroprofil'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
    </View>
  );
}
function Elso_lap({ navigation }) {
  return (
<Elso/>
  );
}
function Iropf({ navigation }) {
  return (
<Iroprofil/>
  );
}
function Iro_lap({ navigation }) {
  return (
<Iro/>
  );
}
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Elso" options={{ title: 'Első oldal' }} component={Elso_lap} />
        <Drawer.Screen name="Irok" options={{ title: 'Írók' }} component={Iro_lap} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
