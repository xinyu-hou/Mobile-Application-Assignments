import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './Home';
const Drawer = createDrawerNavigator();

export default class Events extends React.Component {

  render(){
      return (
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name = "Close Drawer" component = {Home}/>
          </Drawer.Navigator>
        </NavigationContainer>
      );
  }
}
