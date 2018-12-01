import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  TouchableOpacity
} from 'react-native';
  
export default class LeaderboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        "finalLeaderboard": []
    }
  }

  static navigationOptions =  {
    title: "Leader Board"
  } 

  componentDidMount(){
  async () => { //leaderboard
      let user = await AsyncStorage.getItem('highscore');
      let unstring = JSON.parse(user)
      let string = unstring.username + " : " + unstring.score
     
      console.log("this is the string", string)
      let existingLeaderboardString = await AsyncStorage.getItem('topScores')
      let unstringLeaderboard = JSON.parse(existingLeaderboardString)
      if (!unstringLeaderboard){
        unstringLeaderboard = []
      }
      console.log("this is unstringLeaderboard , ", typeof(unstringLeaderboard))
  
      unstringLeaderboard.push(string)
      console.log("this is unstringLeaderboard with string ", unstringLeaderboard)
      try {
          await AsyncStorage.setItem('topScores', JSON.stringify(unstringLeaderboard) )
      }catch (error) {
          console.log(error)
      }
    }
  }

  render() {
    return  (
      <View>
        <TouchableOpacity
          onPress={this.saveData}>
          <Text>SAVE DATA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.showData}>
          <Text>SHOW DATA</Text>
        </TouchableOpacity>
        {/* <View style={styles.container}>
          <FlatList
            {this.state.finalLeaderboard}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View> */}
      </View>
    )
  }

  // getData(){
  //   this.saveData();
  //   this.showData();   
  // }

  showData = async () => {
    try {
      let leader = await AsyncStorage.getItem('topScores')
      let unstring = JSON.parse(leader)
      alert(unstring);
      this.state.finalLeaderboard = unstring
    }
    catch(error) {
      alert(error)
    }    
  }
  
  // saveData = async () => { //leaderboard
  //   let user = await AsyncStorage.getItem('highscore');
  //   let unstring = JSON.parse(user)
  //   let string = unstring.username + " : " + unstring.score
   
  //   console.log("this is the string", string)
  //   let existingLeaderboardString = await AsyncStorage.getItem('topScores')
  //   let unstringLeaderboard = JSON.parse(existingLeaderboardString)
  //   if (!unstringLeaderboard){
  //     unstringLeaderboard = []
  //   }
  //   console.log("this is unstringLeaderboard , ", typeof(unstringLeaderboard))

  //   unstringLeaderboard.push(string)
  //   console.log("this is unstringLeaderboard with string ", unstringLeaderboard)
  //   try {
  //       await AsyncStorage.setItem('topScores', JSON.stringify(unstringLeaderboard) )
  //   }catch (error) {
  //       console.log(error)
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})