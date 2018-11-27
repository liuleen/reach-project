import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
 
import Confetti from 'react-native-confetti';
 
export default class HurrayScreen extends React.Component {
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }
 
  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }
  }
 
static navigationOptions =  {
    headerLeft: null
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