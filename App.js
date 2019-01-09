import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import MapScreen from './screens/MapsScreen';
import LoginScreen from './screens/LoginScreen';


const RootStack = createStackNavigator(
  {
    Home: LoginScreen,
    Map: props => <MapScreen {...props}/>
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
