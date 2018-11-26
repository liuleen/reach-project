import React from 'react';
import {  
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    TouchableHighlight,
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
    constructor(props) { //constructor method
        super(props);
        this.state = {
            "secretWord": "",
            "lives": 6,
            "correctChars": [],
            "guessedChars": [],
            "currentChar": '',
            "answer": "",
            "gameMode": 0,
            "level": ""

        }
    }

    componentWillMount(){
        let gameMode = this.findLevel()
        console.log("this is gameMode: ", gameMode)
        return fetch(`http://app.linkedin-reach.io/words?difficulty=${gameMode}`)
            .then((response) => {
                let wordArray = response._bodyText.split('\n');
                let word = wordArray[Math.floor(Math.random() * (wordArray.length -1))];
                this.setState({
                    "secretWord": word
                })
                console.log("this is le secret word: ", this.state.secretWord);
            })
            .then(() => {
                this.init();
            })
            .catch((error) =>{
                console.error(error);
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            level: nextProps.level
        });
    }
    
    //to see if char has been used, if yes do action, push letter in guessed chars
    // validateLetter()
    //check if letter exists in secretWordString
    // isInSecretWord()
    //if secretWord returns true: update correctChars pop out of correctChars, update dash--> render if in secretWord
        //if answer == secret: winner
    //if secretWord returns false: numberofTries--,
        //draw next animation
        //if numberofTries == 0; gameover alert
    
    findLevel(){
        const { navigation } = this.props;
        const level = navigation.getParam('level', 'no-level');
        let gameMode;

        console.log("this is the level:", level)
        if(level == "easy"){
            gameMode = Math.ceil(Math.random() * 3);
        }else if(level == "medium"){
            gameMode = 3 + Math.ceil(Math.random() * 3);
        }else if(level == "hard"){
            gameMode = 6 + Math.ceil(Math.random() * 3);
        }else{
            // navigate
            gameMode = 4;
        }
        console.log("random number: ", gameMode)
        return gameMode;
    }

    init(){
        let secretWord = this.state.secretWord;
        console.log("this is secret word in init: ", secretWord)
        let correctChars = [];
        for(let i = 0; i < secretWord.length; i++){
            correctChars.push("_");
        }
        console.log("this is array of correctChars:", correctChars)
        this.setState({
            correctChars
        })
    }

    validateLetter(guessedChars, letter){
        guessedChars.push(letter);
        console.log("this is array of guessedChars:", guessedChars)
        let correctChars = this.state.correctChars;
        let secretWord = this.state.secretWord;
        let lives = this.state.lives;
        if(secretWord.toUpperCase().indexOf(letter)!=-1){
            for(let i = 0; i < secretWord.length; i++){
                if(secretWord[i].toUpperCase() == letter)
                    correctChars[i] = letter;
            }
            if(correctChars.join("").toLowerCase == secretWord){
                console.log("winner")
            }
        }
        else{
            lives = lives - 1;
            if(lives == 0){
                console.log("you lost")
            }
        }
        this.setState({
            correctChars,
            lives,
            guessedChars,
        })
    }

    onKeyPress(letter){
        let guessedChars = this.state.guessedChars;
        if(guessedChars.indexOf(letter)==-1){
          this.validateLetter(guessedChars, letter);
        }else{
          return;
        }
        // console.log("this is the pressed letter: ", letter);
    }
    
    // static navigationOptions = {
    //     title: ,
    //   };

    render() { //render method
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
                {/* <View>
                    <Text>
                        LIVES: 6
                    </Text>
                </View> */}
                <View styles={styles.contentContainer}>
                    <View style={styles.dashes}>
                        {this.state.correctChars.map((letter,index)=>{
                            return(
                                <View style={styles.dashItemContainer} key={index}>
                                    <Text style={styles.dashItem}>
                                        {letter}
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
                                        }else if(this.state.correctChars.indexOf(letter)!=-1){
                                            return(
                                                <View style={styles.keyItemUsed} key={index}>
                                                    <Text key={index} style={styles.usedKey}>
                                                        {letter}
                                                    </Text>
                                                </View>
                                                )
                                        }else if(this.state.correctChars.indexOf(letter)==-1 && this.state.guessedChars.indexOf(letter)!=-1){
                                            return(
                                                <View style={styles.keyItemUsedWrong} key={index}>
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
                <View style={styles.giveUp}>
                    <TouchableOpacity>
                        <Text style={styles.giveUpTxt}>GIVE UP</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
}
    
    

