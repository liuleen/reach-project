import React from 'react';
import {  
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    TouchableHighlight
 } from 'react-native';

import styles from '../styles/gameStyles';
import { 
    Svg,
    Circle,
    G,
    Line,
    Rect 
} from 'react-native-svg';

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "secretWord": 'stumpy',
            "numOfTries": 6,
            "leftChars": ["s","t","u","m","p","y"],
            "guessedChars": [],
            "currentChar": '',
            "answer": "",

        }
    }

    componentDidMount(){
        return fetch('http://app.linkedin-reach.io/words?difficulty=5&count=6')
            .then((response) => {
                let wordArray = response._bodyText.split('\n');
                let word = wordArray[Math.floor(Math.random() * (wordArray.length -1))];
                this.setState({"secretWord": word})
                // console.log("this is le secret word: ", secretWord);
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    
    //to see if char has been used, if yes do action, push letter in guessed chars
    // validateLetter()
    //check if letter exists in secretWordString
    // isInSecretWord()
    //if secretWord returns true: update leftChars pop out of leftChars, update dash--> render if in secretWord
        //if answer == secret: winner
    //if secretWord returns false: numberofTries--,
        //draw next animation
        //if numberofTries == 0; gameover alert

    onKeyPress(letter){
        let guessedChars = this.state.guessedChars;
        if(guessedChars.indexOf(letter)==-1){
          this.validate(guessedChars,letter);
        }else{
          return;
        }
        // console.log("this is the pressed letter: ", letter);
    }
    
    render() {
        const keysRows = [
            ["A","B","C","D","E","F","G","H","I","J"],
            ["K","L","M","N","O","P","Q","R","S"],
            [" ","T","U","V","W","X","Y","Z"," "]]
        
        const { navigation } = this.props;
        const level = navigation.getParam('level', 'no-level');
        const username = navigation.getParam('username', 'no-username');

        return (
            <View style={styles.container}>
                <View >  
                    <Text>SecretWord: {this.state.secretWord}</Text>
                    <Text>level: {level}</Text>
                    <Text>username: {username}</Text>
                </View>

                 <View style={styles.dashes}>
                    {this.state.leftChars.map((letter,index)=>{
                        return(
                            <View style={styles.dashItemContainer} key={index}>
                                <Text style={styles.dashItem}>
                                    {letter}
                                    {/* _ */}
                                </Text>
                            </View>
                        )
                    })}
                </View>
                
                <View style={styles.keyboard}>
                    {keysRows.map((keys,rowIndex)=>{
                        return(
                            <View key={rowIndex} style={styles.keyboardRow}>
                                {keys.map((letter,index)=>{
                                    if(letter==" "){
                                        return (
                                            <Text key={index}> </Text>
                                        )
                                    }else if(this.state.leftChars.indexOf(letter)!=-1){
                                        return(
                                            <View style={styles.keyItem} key={index}>
                                                <Text key={index} style={styles.usedKey}>
                                                    {letter}
                                                </Text>
                                            </View>
                                            )
                                    }else{
                                        return(
                                            <TouchableOpacity 
                                                onPress={this.onKeyPress.bind(this, letter)} 
                                                style={styles.keyItem} 
                                                key={index}>
                                                    <Text style={styles.letter}>
                                                        {letter}
                                                    </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                
                                })}
                             </View>
                        )
                    })}

                </View>
            </View>
        );
    }
}
    
    

