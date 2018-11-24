import React, {Component} from 'react';
import {
  StyleSheet, 
  Text
} from 'react-native';

import WelcomeScreen from './src/pages/welcomeScreen';
import {StackNavigator} from 'react-navigation';
import GameScreen from './src/pages/gameScreen';

/**
 * The root component of the application.
 * In this component I am handling the entire application state.
**/

export default class App extends Component {
  
  /**
   * routing from {start button} welcomeScreen
   * -> to select level popup dialog, username creation (drop down level selection)
   * -> to game screen
   * -> to top scores screen
   */

  render() {
    return (
      <AppStackNavigator/>
    )
  }
}

const AppStackNavigator = new StackNavigator({
  WelcomeScreen:{
    screen: WelcomeScreen
  },
  GameScreen:{
    screen: GameScreen
  }
})