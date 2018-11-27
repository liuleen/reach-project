import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
 
import Confetti from 'react-native-confetti';
 
export default class LeaderboardScreen extends React.Component {
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }
 
static navigationOptions =  {
    title: "Leader Board"
}

_storeData = async () => {
  try {
    await AsyncStorage.setItem(this.state.username, this.state.previousScore);
  } catch (error) {
    // Error saving data
  }
}

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
   } catch (error) {
     // Error retrieving data
   }
}

render() {
    return <View style={styles.container}>
      <Confetti ref={(node) => this._confettiView = node}/>
    </View>
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});