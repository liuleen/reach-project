import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  TouchableOpacity
} from 'react-native';
 
import Confetti from 'react-native-confetti';
 
export default class LeaderboardScreen extends React.Component {

  constructor(props) { //constructor method
    super(props);
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'no-username');
    this.state = {
        username: username,
        score: this.props.score
    }
  }

  static navigationOptions =  {
    title: "Leader Board"
  } 

  render() {
    return  (
      <View>
        <TouchableOpacity
          onPress={this.saveData}>
          <Text>PUSH FOR DATA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.showData}>
          <Text>PUSH TO SHOW DATA</Text>
        </TouchableOpacity>
      </View>
    )
  }

  saveData() {
    // const { navigation } = this.props;
    let username = this.state.username;
    AsyncStorage.setItem('username', username)
  }

  showData = async () => {
    try {
      let user = await AsyncStorage.getItem('username');
      alert(user);
    }
    catch(error) {
      alert(error)
    }
  }
}

  // componentDidMount() {
    // if(this._confettiView) {
    //    this._confettiView.startConfetti();
    // }

  //   storeData = async () => {
  //     const { navigation } = this.props;
  //     const username = navigation.getParam('username', 'no-username');
  //     const score = navigation.getParam('score', 'no-score');
  //     try {
  //       await AsyncStorage.setItem(username, score);
  //     } catch (error) {
  //       // Error saving data
  //     }
  //   }
  // }
 


// storeData = async () => {
//   const { navigation } = this.props;
//   const username = navigation.getParam('username', 'no-username');
//   const score = navigation.getParam('score', 'no-score');
//   try {
//     await AsyncStorage.setItem(username, score);
//   } catch (error) {
//     // Error saving data
//   }
// }

// retrieveData = async () => {
//   try {
//     const user = await AsyncStorage.getItem('username');
//     if (user !== null && topScore !== null) {
//       // We have data!!
//       console.log('this is the username in data: ', user);
//       alert(user);
//     }
//   }catch (error) {
//     alert(error);
//      // Error retrieving data
//    }
// }

// render() {

//     const { navigation } = this.props;
//     const username = navigation.getParam('username', 'no-username');
//     const score = navigation.getParam('score', 'no-score');
//     console.log("hello world")
//     return <View style={styles.container}>
//       <Confetti ref={(node) => this._confettiView = node}/>
//       <Text>
//         {username} : {score}
//       </Text>
//     </View>
//   }
// }
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});