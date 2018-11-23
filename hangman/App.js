import React, {Component} from 'react';
import {
  StyleSheet, 
} from 'react-native';

import Welcome from './src/pages/welcomeScreen';

state = {
  chooseDifficulty: false //has the app completed the welcome animation
}
/**
 * The root component of the application.
 * In this component I am handling the entire application state.
**/

export default class App extends Component {
  
  /**
   * routing from {start button} welcomeScreen
   * -> to select level screen (drop down level selection)
   * -> to game screen
   * -> to top scores screen
   */

  render() {
    return (
      <Welcome/>
    )
  }
}