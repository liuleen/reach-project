import React, {Component} from 'react';
import {
  StyleSheet, 
  Text
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import WelcomeScreen from './src/components/welcomeScreen';
import GameScreen from './src/components/gameScreen';
import ChallengeScreen from './src/components/challengeScreen';

/**
 * The root component of the application.
**/

export default class App extends Component {
  
  /**
   * routing from {start button} welcomeScreen
   * -> to select level popup dialog, username creation
   * -> to game screen depending on level chosen
   */

  render() {
    return (
      <Hangman/>
    )
  }
}

/**
 * StackNavigator imported from react navigation used to navigate between different scenes of the game
 */

const Hangman = new StackNavigator({
  WelcomeScreen:{
    screen: WelcomeScreen
  },
  GameScreen:{
    screen: GameScreen
  },
  ChallengeScreen:{
    screen: ChallengeScreen
  },
})
