import React from 'react';
import {  
    Text,
    View,
    Button,
    Animated,
    Image,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Modal
 } from 'react-native';

import styles from '../styles/gameStyles';
import bgImg from '../images/water.gif';
import Hangman from '../images/corgi.gif';
import balloon from '../images/balloon1.gif';
import { 
    Svg,
    Circle,
    G,
    Line,
    Rect 
} from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';

export default class GameScreen extends React.Component {
    constructor(props) { //constructor method
        super(props);
        this.state = {
            "secretWord": "",
            "lives": 6,
            "correctChars": [],
            "guessedChars": [],
            "gameMode": 0,
            "level": "",
            "fullWord": "",
            "modalVisible": false,
            "previousScore":0,
            "secretArray": [],
        }
    }

    componentWillMount(){
        let gameMode = this.findLevel()
        console.log("this is gameMode: ", gameMode)
        return fetch(`http://app.linkedin-reach.io/words?difficulty=${gameMode}`)
            .then((response) => {
                let wordArray = response._bodyText.split('\n');
                // let word = wordArray[Math.floor(Math.random() * (wordArray.length -1))];
                this.setState({
                    "secretArray": wordArray
                })
                console.log("this is le secret array: ", this.state.secretArray);
            })
            .then(() => {
                this.init();
            })
            .catch((error) =>{
                console.error(error);
            }
        );
    }

    checkFullWord(){
        if(this.state.secretWord == this.state.fullWord.toLowerCase()){
            this.props.navigation.navigate('HurrayScreen');
        }else{
            this.setState({
                "lives": this.state.lives - 1
            })
        }
    }

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
        let secretArrayLength = this.state.secretArray.length
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (secretArrayLength))];
        console.log("this is secret word in init: ", secretWord)
        let correctChars = [];
        for(let i = 0; i < secretWord.length; i++){
            correctChars.push("_");
        }
        console.log("this is array of correctChars:", correctChars)
        this.setState({
            correctChars,
            secretWord
        })
    }

    NewGame() {
        console.log("Reset")
        let newScore = this.state.previousScore + this.state.lives;
        let secretArrayLength = this.state.secretArray.length
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (secretArrayLength))];
        console.log("new score", newScore)
        this.setState({
            "previousScore": newScore,
            secretWord,
            "lives": 6,
            "correctChars": [],
            "guessedChars": [],
            "fullWord": "",
            "modalVisible": false,
        })
        this.init();
        // console.log(this.state)
    }

    resetGame() {
        let secretArrayLength = this.state.secretArray.length
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (secretArrayLength))];
        this.setState({
            "previousScore": 0,
            secretWord,
            "lives": 6,
            "correctChars": [],
            "guessedChars": [],
            "fullWord": "",
            "modalVisible": false,
        })
        this.init();
    }

    validateLetter(guessedChars, letter){
        guessedChars.push(letter);
        console.log("this is array of guessedChars:", guessedChars)
        let correctChars = this.state.correctChars;
        let secretWord = this.state.secretWord;
        let lives = this.state.lives;
        console.log("secret word in validateletter:", secretWord)
        if(secretWord.toUpperCase().indexOf(letter)!=-1){
            for(let i = 0; i < secretWord.length; i++){
                if(secretWord[i].toUpperCase() == letter)
                    correctChars[i] = letter;
            }
        }else{
            lives = lives - 1;
            console.log("number of lives left", lives)
            if(lives == 0){
                Alert.alert(
                    'GAME OVER',
                    '',
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
            console.log("lives: ", this.state.lives)
            this.NewGame();
            console.log("this is state not in reset", this.state)
            // Alert.alert(
            //     'You Win!!',
            //     '',
            //     [
            //       {text: 'Play Again', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            //       {text: 'Cancel', onPress: () => console.log('OK Pressed')},
            //     ],
            //     { cancelable: false }
            // )
        }
    }

    onKeyPress(letter){
        let guessedChars = this.state.guessedChars;
        if(guessedChars.indexOf(letter)==-1){
          this.validateLetter(guessedChars, letter);
        }else{
          return;
        }
    }
    
    static navigationOptions = {
        header: null
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() { //render method
        const keysRows = [
            ["A","B","C","D","E","F","G","H","I","J"],
            ["K","L","M","N","O","P","Q","R","S"],
            [" ","T","U","V","W","X","Y","Z"," "]]
        
        const { navigation } = this.props;
        const level = navigation.getParam('level', 'no-level');
        const username = navigation.getParam('username', 'no-username');
        
        return (
            <ImageBackground source={bgImg} style={styles.imgContainer}>
                <View style={styles.container} behavior="padding">
                    {/* <View style={styles.information}>  
                        <Text>SecretWord: {this.state.secretWord}</Text>
                        <Text>level: {level}</Text>
                        <Text>username: {username}</Text>
                    </View> */}
                    <View style={styles.information}>
                        <Text>
                            LIVES:{this.state.lives} 
                        </Text>
                        <Text>
                            SCORE:{this.state.previousScore}
                            {console.log(this.state)} 
                        </Text>
                    </View>
                    <View>
                        <View style={styles.balloon}>
                            <Animated.Image
                                source={balloon}
                                style={{height: 100, width: 100}}
                            />
                            <Animated.Image
                                source={balloon}
                                style={{height: 100, width: 100}}
                            />
                        </View>
                        <Animated.Image
                            source={Hangman}
                            style={{height: 100, width: 100}}
                        />
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
                            <Text style={styles.helpTxt}>HINT</Text>
                        </TouchableOpacity> 
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{marginTop:300}}>
                                <View>
                                <TextInput 
                                    style={styles.fullWord}
                                    placeholder="I know the word!"
                                    onChangeText={(fullWord) => this.setState({fullWord})}
                                    blurOnSubmit={true}/>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.checkFullWord()
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Submit</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Nevermind</Text>
                                </TouchableHighlight>
                                </View>
                            </View>
                            </Modal>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}>
                                <Text>I know the Word!</Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableOpacity>
                            <Text 
                                style={styles.giveUpTxt}
                                onPress={() => {
                                    Alert.alert(
                                        'Are you sure?',
                                        '',
                                        [
                                          {text: 'Yes', onPress: () => this.props.navigation.navigate('WelcomeScreen')},
                                          {text: 'Cancel', onPress: () => console.log('cancel Pressed')},
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                GIVE UP
                            </Text>
                        </TouchableOpacity> 
                    </View>
                </View>
                
            </ImageBackground>
        );
    }
}