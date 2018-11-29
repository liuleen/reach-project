import React from 'react';
import {  
    Animated,
    Alert,
    TouchableOpacity,
    ImageBackground,
 } from 'react-native';

import styles from '../styles/gameStyles';
import bgImg from '../images/calm.gif';
import Hangman from '../images/corgi.gif';
import balloon from '../images/balloon1.gif';
import { Image,Text, View } from 'react-native-animatable';

export default class ChallengeScreen extends React.Component {
    constructor(props) { //constructor method
        super(props);
        this.state = {
            "secretWord": "",
            "lives": 1,
            "correctChars": [],
            "guessedChars": [],
            "gameMode": 0,
            "level": "",
            "modalVisible": false,
            "previousScore":0,
            "secretArray": [],
            "timer": 60,
        }
    }

    componentDidMount(){
        return fetch(`http://app.linkedin-reach.io/words?difficulty=5&minLength>=5`)
        .then((response) => {
            let wordArray = response._bodyText.split('\n');
            this.setState({
                "secretArray": wordArray
            })
        })
        .then(() => {
            this.init();
        })
        .then(() => {
            this.interval = setInterval(
                () => this.setState((prevState)=>({ timer: prevState.timer - 1 }))
              , 1000);
        })
        .catch((error) =>{
            console.error(error);
        });
    };

    // componentDidMount(){
    //     this.interval = setInterval(
    //         () => this.setState((prevState)=>({ timer: prevState.timer - 1 }))
    //       , 1000);
    // }

    componentDidUpdate(){
        if(this.state.timer === 0){ 
          let score = this.state.previousScore;
          const { navigation } = this.props;
          const username = navigation.getParam('username', 'no-username');
          Alert.alert(
            'GAME OVER',
            'Wow! Great job ' + username + ', you scored ' + score + ' points!',
            [
              {text: 'Try Again?', onPress: () => this.resetGame()},
              {text: 'Cancel', onPress: () => this.props.navigation.navigate('WelcomeScreen')},
            ],
            { cancelable: false }
          )
        }
    };

    init(){
        let secretArrayLength = this.state.secretArray.length
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (secretArrayLength))];
        console.log("this is secret word in init: ", secretWord)
        let correctChars = [];
        for(let i = 0; i < secretWord.length; i++){
            correctChars[i] = secretWord[i].toUpperCase();
        }
        let randomIndex = Math.floor(Math.random() * secretWord.length);
        console.log("randomIndex", randomIndex)
        let char = correctChars[randomIndex];
        console.log("char: ", char)
        for(let i = 0; i < secretWord.length; i++){
            console.log("correct char :", correctChars[i])
            if(correctChars[i] == char){
                correctChars[i] = '_';
            }
        }
        console.log("this is array of correctChars:", correctChars)
        this.setState({
            correctChars,
            secretWord,
        })
    };

    NewGame() {
        let newScore = this.state.previousScore + this.state.lives;
        let secretArrayLength = this.state.secretArray.length
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (secretArrayLength))];
        this.setState({
            "previousScore": newScore,
            secretWord,
            "lives": 1,
            "correctChars": [],
            "guessedChars": [],
            "modalVisible": false,
        })
        this.init();
    };

    resetGame() {
        let secretArrayLength = this.state.secretArray.length
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (secretArrayLength))];
        this.setState({
            "previousScore": 0,
            secretWord,
            "lives": 1,
            "correctChars": [],
            "guessedChars": [],
            "modalVisible": false,
            "timer": 60
        })
        this.init();
    };

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
        }else{
            lives = lives - 1;
            if(lives == 0){
                let score = this.state.previousScore;
                const { navigation } = this.props;
                const username = navigation.getParam('username', 'no-username');
                Alert.alert(
                    'GAME OVER',
                    'Good Job ' + username + '! you scored ' + score + ' points!',
                    [
                    {text: 'Try Again?', onPress: () => this.resetGame()},
                    {text: 'Cancel', onPress: () => this.props.navigation.navigate('WelcomeScreen')},
                    ],
                    { cancelable: false }
                )
            }
        }
        this.setState({
            correctChars,
            lives,
            guessedChars,
        })
        if(correctChars.join("").toLowerCase() == secretWord){
            this.NewGame();
        }
    };

    onKeyPress(letter){
        let guessedChars = this.state.guessedChars;
        if(guessedChars.indexOf(letter)==-1){
          this.validateLetter(guessedChars, letter);
        }else{
          return;
        }
    };

    giveUp() {
        this.props.navigation.navigate('WelcomeScreen')
        clearInterval(this.interval)
    };

    static navigationOptions = {
        header: null
    };

    render() { //render method
        const keysRows = [
            ["A","B","C","D","E","F","G","H","I","J"],
            ["K","L","M","N","O","P","Q","R","S"],
            [" ","T","U","V","W","X","Y","Z"," "]]
        
        // const { navigation } = this.props;
        let corgi = <Image source={Hangman} duration={8000} style={{bottom: 40, height: 100, left: 8,width: 100, position: "relative"}}/>
        let corgiFall = <Image animation={'fadeOutDownBig'} source={Hangman} style={{bottom: 40, height: 100, left:8, width: 100, position: "relative"}}/>
        let balloon0 = <Image source={balloon} style={{left: 30, top: 20, height: 100, width: 30, position: "relative"}} />
        let balloon0fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{left: 30, top: 20, height: 100, width: 30,position: "relative"}}/>
          
        return (
            <ImageBackground source={bgImg} style={styles.imgContainer}>
                <View style={styles.headerContainer}>
                    <Text animation={'slideInDown'} style={styles.gameTitle}>H  A  N  G  M  A  N</Text>
                    <View style={styles.information}>
                        <Text style={styles.livesText}>
                            LIVES:{this.state.lives} 
                        </Text>
                        <Text style={styles.timer}>
                            {this.state.timer}
                        </Text>
                        <Text style={styles.scoreText}>
                            SCORE:{this.state.previousScore}
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.balloon}>
                        {this.state.lives>0?balloon0:balloon0fly}
                    </View>
                    {this.state.lives==0?corgiFall:corgi}
                </View>
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
                <View style={styles.footerButtons}>
                    <TouchableOpacity>
                        <Text 
                            style={styles.hintText}
                            onPress={() => {
                                Alert.alert(
                                    'You only have 1 letter left',
                                    '',
                                    [
                                      {text: 'Thanks'},
                                    ],
                                    { cancelable: false }
                                )
                            }}>
                        USELESS HINT
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity>
                        <Text 
                            style={styles.giveUpTxt}
                            onPress={() => {
                                Alert.alert(
                                    'Are you sure?',
                                    '',
                                    [
                                      {text: 'Yes', onPress: () => this.giveUp()},
                                      {text: 'Cancel', onPress: () => console.log('cancel Pressed')},
                                    ],
                                    { cancelable: false }
                                )
                            }}>
                            GIVE UP
                        </Text>
                    </TouchableOpacity> 
                </View>
            </ImageBackground>
        );
    }
}