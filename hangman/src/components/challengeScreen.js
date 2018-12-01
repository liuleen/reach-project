import React from 'react';
import {  
    Alert,
    TouchableOpacity,
    ImageBackground,
 } from 'react-native';

import styles from '../styles/gameStyles';
import bgImg from '../images/sparkles.gif';
import Hangman from '../images/corgi.gif';
import balloon from '../images/balloon1.gif';
import { Image,Text, View } from 'react-native-animatable';

/**
 * The Challenge component of the application.
 * The User will be routed to this challenge screen if she/he chooses the challenge level
 * The difference between this level and the other ones is 
 *      -that there is a 60 second timer,
 *      -the hint is useless
 *      -no full word guessing
 *      -only 1 life, to guess 1 letter (fair right?)
 *      -difficulty level is 5 with words longer than 5 
**/

/**
 * Inside the state:
 *  the only difference here is the timer in the state.
 */
export default class ChallengeScreen extends React.Component {
    constructor(props) {
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
        this.showAlertDelay = this.showAlertDelay.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    /**
     * Added a setInterval function for the timer
     */
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

    /**
     * A componenet lifecycle to check on timer, once timer runs out, game is over. 
     */
    componentDidUpdate(){
        if(this.state.timer === 0){ 
            clearInterval(this.interval)
            this.showAlertDelay();
        }
    };

    init(){
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (this.state.secretArray.length))];
        let correctChars = [];
        for(let i = 0; i < secretWord.length; i++){
            correctChars[i] = secretWord[i].toUpperCase();
        }
        let randomIndex = Math.floor(Math.random() * secretWord.length);
        let char = correctChars[randomIndex];
        for(let i = 0; i < secretWord.length; i++){
            if(correctChars[i] == char){
                correctChars[i] = '_';
            }
        }
        this.setState({
            correctChars,
            secretWord,
        })
    };

    onKeyPress(letter){
        let guessedChars = this.state.guessedChars;
        if(guessedChars.indexOf(letter)==-1){
          this.validateLetter(guessedChars, letter);
        }else{
          return;
        }
    };

    validateLetter(guessedChars, letter){
        guessedChars.push(letter);
        let { correctChars, secretWord, lives} = this.state;
        if(secretWord.toUpperCase().indexOf(letter)!=-1){
            for(let i = 0; i < secretWord.length; i++){
                if(secretWord[i].toUpperCase() == letter)
                    correctChars[i] = letter;
            }
        }else{
            lives = lives - 1;
            if(lives == 0){
                clearInterval(this.interval)
                this.showAlertDelay();
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

    NewGame() {
        let newScore = this.state.previousScore + this.state.lives;
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (this.state.secretArray.length))];
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
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (this.state.secretArray.length))];
        this.setState({
            "previousScore": 0,
            secretWord,
            "lives": 1,
            "correctChars": [],
            "guessedChars": [],
            "modalVisible": false,
            "timer": 60
        })
        this.interval = setInterval(
            () => this.setState((prevState)=>({ timer: prevState.timer - 1 }))
          , 1000);
        this.init();
    };

    giveUp() {
        this.props.navigation.navigate('WelcomeScreen')
        clearInterval(this.interval)
    };

    static navigationOptions = {
        header: null
    };

    showAlertDelay(){
        let score = this.state.previousScore
        const { navigation } = this.props;
        const username = navigation.getParam('username', 'no-username');
        setTimeout(() => {
            Alert.alert(
                'GAME OVER! Your word was: "' + this.state.secretWord + '".',
                'Good Job ' + username + '! You scored ' + score + ' points!',
                [
                {text: 'Try Again?', onPress: () => this.resetGame()},
                {text: 'Cancel', onPress: () => navigation.navigate('WelcomeScreen')},
                ],
                { cancelable: false }
            )
        }, 1000);
    }
    
    render() {
        
        const keysRows = [
            ["A","B","C","D","E","F","G","H","I","J"],
            ["K","L","M","N","O","P","Q","R","S"],
            [" ","T","U","V","W","X","Y","Z"," "]]
        
        let corgi = <Image source={Hangman} style={{bottom: 40, height: 100, left: 8,width: 100, position: "relative"}}/>
        let corgiFall = <Image animation={'fadeOutDownBig'} duration={5000} source={Hangman} style={{bottom: 40, height: 100, left:8, width: 100, position: "relative"}}/>
        let balloon0 = <Image source={balloon} style={{left: 30, top: 20, height: 100, width: 30, position: "relative"}} />
        let balloon0fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{left: 30, top: 20, height: 100, width: 30,position: "relative"}}/>
          
        return (
            <ImageBackground source={bgImg} style={styles.imgContainer}>
                <View style={styles.headerContainer}>
                    <Text animation={'slideInDown'} style={styles.challengeGameTitle}>H  A  N  G  M  A  N</Text>
                    <View style={styles.information}>
                        <Text style={styles.challengeLivesText}>
                            LIVES:{this.state.lives} 
                        </Text>
                        <Text style={styles.timer}>
                            {this.state.timer}
                        </Text>
                        <Text style={styles.challengeScoreText}>
                            SCORE:{this.state.previousScore}
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.balloon}>
                        {this.state.lives>0?balloon0:balloon0fly}
                    </View>
                    {this.state.lives==0 || this.state.timer == 0 ?corgiFall:corgi}
                </View>
                <View style={styles.dashes}>
                    {this.state.correctChars.map((letter,index)=>{
                        return(
                            <View style={styles.dashItemContainer} key={index}>
                                <Text style={styles.challengeDashItem}>
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

