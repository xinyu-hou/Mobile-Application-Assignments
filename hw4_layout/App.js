import * as React from 'react';
import { Text, View, Image } from 'react-native';
import Constants from 'expo-constants';
import House from './components/House';

// Note you can include the house as background image
export default class App extends React.Component {
  render() {
    return <House/>
  }
}