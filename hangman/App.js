import React, {Component} from 'react';
import {
  StyleSheet, 
} from 'react-native';

import Welcome from './src/pages/welcomeScreen';

/**
 * The root component of the application.
 * In this component I am handling the entire application state.
**/

export default class App extends Component {
  render() {
    return (
      <Welcome/>
    );
  }
}