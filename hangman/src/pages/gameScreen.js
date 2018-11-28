import React from 'react';
import {  
    // Text,
    // View,
    Button,
    Animated,
    // Image,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Modal,
    TextInput,
    // Header
 } from 'react-native';

import AwesomeButton from 'react-native-really-awesome-button';
import { Image, Text, View } from 'react-native-animatable';
import styles from '../styles/gameStyles';
import bgImg from '../images/slowgalaxy.gif';
import Hangman from '../images/corgi.gif';
import balloon from '../images/balloon1.gif';
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
            "gameMode": 0,
            "level": "",
            "fullWord": "",
            "modalVisible": false,
            "previousScore":0,
            "secretArray": [],
            "hint": "",
            "hintPressed": false
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

    giveHint(){
        console.log("hint:", this.state.hint)
        let secretWord = this.state.secretWord;
        let correctChars = this.state.correctChars;
        let hintChar = this.state.hint;
        console.log("hintchar" ,hintChar)
        console.log("hintpressed?", this.state.hintPressed)
        if(this.state.hintPressed === false){
            for(let i = 0; i<secretWord.length; i++){
                if(correctChars[i] == '_'){
                    console.log("correctChar: ", correctChars[i])
                    console.log("secretletter", secretWord[i])
                    hintChar = secretWord[i];
                    console.log("hintCHar should be changed to: ", hintChar)
                    i = secretWord.length ;
                }
            }
        }else{
            return;
        }
        return(hintChar);
    }

    checkFullWord(){
        if(this.state.secretWord == this.state.fullWord.toLowerCase()){
            this.NewGame();
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
        }else{
            gameMode = 6 + Math.ceil(Math.random() * 3);
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
            "hint": "",
            "hintPressed": false
        })
        this.init();
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
            "hint": "",
            "hintPressed": false
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
                if(this.state.previousScore > 5){
                    let score = this.state.previousScore
                    const { navigation } = this.props;
                    const username = navigation.getParam('username', 'no-username');
                    Alert.alert(
                        'GAME OVER',
                        'Good Job ' + username + '! You scored ' + score + ' points!',
                        [
                        {text: 'Try Again?', onPress: () => this.resetGame()},
                        {text: 'Cancel', onPress: () => this.props.navigation.navigate('WelcomeScreen')},
                        ],
                        { cancelable: false }
                    )
                }else{
                    let score = this.state.previousScore
                    const { navigation } = this.props;
                    const username = navigation.getParam('username', 'no-username');
                    Alert.alert(
                        'GAME OVER',
                        'You could do better, ' + username + '! You only scored ' + score + ' points!',
                        [
                          {text: 'Try Again?', onPress: () => this.resetGame()},
                          {text: 'Cancel', onPress: () => this.props.navigation.navigate('WelcomeScreen')},
                        ],
                        { cancelable: false }
                    )
                }
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
        // let corgi = <image x1="250" y1 = "0" x2="250" y2 = "120" 
        const keysRows = [
            ["A","B","C","D","E","F","G","H","I","J"],
            ["K","L","M","N","O","P","Q","R","S"],
            [" ","T","U","V","W","X","Y","Z"," "]]
        
        let hintButton;
        if(this.state.hintPressed == false){
            hintButton =
            (<TouchableOpacity>
                <Text 
                    style={styles.hintText}
                    onPress={() => {
                        let hint = this.giveHint();
                        this.setState({"hintPressed": true})
                        Alert.alert(
                            'HINT',
                            'Try this letter: "' + hint + '"',
                            [
                            {text: 'Okay'},
                            ],
                            { cancelable: false }
                        )
                    }}>HINT
                </Text>
            </TouchableOpacity>)
        }else{
            hintButton =
            (<View>
                <Text style={styles.hintTextstatic}>
                    HINT
                </Text>
            </View>)
        }
        
        // let balloon1;
        // if(this.state.lives == 5){
        //     balloon1=
        //     (
        //         <View style={styles.animation}>
        //             <View style={styles.balloon}>
        //                 <Animated.Image
        //                     animation={'fadeOutBig'}
        //                     source={balloon}
        //                     style={{left: 5, top: 10, height: 100, width: 30, zIndex: 1, position:"absolute"}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{height: 100, width: 30, zIndex: 0}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right: 10, height: 100, width: 30}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right:15, top:10, height: 100, width: 30}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right: 25, top:10, height: 100, width: 30}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right: 60, bottom: 10, height: 100, width: 30}}
        //                 />
        //             </View>
        //             <Animated.Image
        //                 source={Hangman}
        //                 style={{bottom: 50, height: 100, width: 100}}
        //             />
        //         </View>
        //     )
        // }else{
        //     balloon1=
        //     (
        //         <View style={styles.animation}>
        //             <View style={styles.balloon}>
        //                 <Image
        //                     source={balloon}
        //                     style={{left: 5, top: 10, height: 100, width: 30, zIndex: 1, position:"absolute"}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{height: 100, width: 30, zIndex: 0}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right: 10, height: 100, width: 30}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right:15, top:10, height: 100, width: 30}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right: 25, top:10, height: 100, width: 30}}
        //                 />
        //                 <Animated.Image
        //                     source={balloon}
        //                     style={{right: 60, bottom: 10, height: 100, width: 30}}
        //                 />
        //             </View>
        //             <Animated.Image
        //                 source={Hangman}
        //                 style={{bottom: 50, height: 100, width: 100}}
        //             />
        //         </View>
        //     )
        // }
        return (
            <ImageBackground source={bgImg} style={styles.imgContainer}>
                <View style={styles.headerContainer}>
                    <Text animation={'slideInDown'} style={styles.gameTitle}>H  A  N  G  M  A  N</Text>
                    <View style={styles.information}>
                        <Text style={styles.livesText}>
                            LIVES:{this.state.lives} 
                        </Text>
                        <Text style={styles.scoreText}>
                            SCORE:{this.state.previousScore}
                            {console.log(this.state)} 
                        </Text>
                    </View>
                </View>
                <View style={styles.animation}>
                    <View style={styles.balloon}>
                        <Animated.Image
                            source={balloon}
                            style={{left: 5, top: 10, height: 100, width: 30, zIndex: 1, position:"absolute"}}
                        />
                        <Animated.Image
                            source={balloon}
                            style={{height: 100, width: 30, zIndex: 0}}
                        />
                        <Animated.Image
                            source={balloon}
                            style={{right: 10, height: 100, width: 30}}
                        />
                        <Animated.Image
                            source={balloon}
                            style={{right:15, top:10, height: 100, width: 30}}
                        />
                        <Animated.Image
                            source={balloon}
                            style={{right: 25, top:10, height: 100, width: 30}}
                        />
                        <Animated.Image
                            source={balloon}
                            style={{right: 60, bottom: 10, height: 100, width: 30}}
                        />
                    </View>
                    <Animated.Image
                        source={Hangman}
                        style={{bottom: 50, height: 100, width: 100}}
                    />
                </View>
                {balloon1}
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
                    {hintButton}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                    }}>
                        <View style={{marginTop:300, backgroundColor: '#black'}}>
                            <TextInput 
                                style={styles.fullWord}
                                placeholder="I know the word!"
                                onChangeText={(fullWord) => this.setState({fullWord})}
                                blurOnSubmit={true}/>
                            <View style={styles.modalButtons}>
                                <TouchableHighlight
                                    style={styles.submitFullWord}
                                    onPress={() => {
                                        this.checkFullWord()
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Submit</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={styles.nevermind}                          
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Nevermind</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text style={{color: "yellow", fontSize: 20}}>I know the Word!</Text>
                    </TouchableHighlight>
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
                            }}>
                            GIVE UP
                        </Text>
                    </TouchableOpacity> 
                </View>
            </ImageBackground>
        );
    }
}