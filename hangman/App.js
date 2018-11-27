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
      <Hangman/>
    )
  }
}

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
