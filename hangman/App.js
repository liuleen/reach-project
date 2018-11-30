import React, {Component} from 'react';
import {
  StyleSheet, 
  Text
} from 'react-native';

import WelcomeScreen from './src/pages/welcomeScreen';
import {StackNavigator} from 'react-navigation';
import GameScreen from './src/pages/gameScreen';
import LeaderboardScreen from './src/pages/leaderboardScreen';
import ChallengeScreen from './src/pages/challengeScreen';

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
  LeaderboardScreen:{
    screen: LeaderboardScreen
  }
})
