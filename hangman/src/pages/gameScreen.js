import React from 'react';
import {  
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Modal,
    TextInput,
 } from 'react-native';

import { Image, Text, View } from 'react-native-animatable';
import styles from '../styles/gameStyles';
import bgImg from '../images/cartoonclouds.gif';
import Hangman from '../images/corgi.gif';
import balloon from '../images/balloon1.gif';

/**
 * The Game component of the application.
 * The User will be routed to this game page once she/he chooses a difficulty level.
 * Top left corner represents how many lives the User has left. She/he will start off 
 *     with 6 lives
 * Top right corner represents the score. The scores accumulate depending on how many
 *     lives you have left after each round.
 * The Corgi animation is being held up by exactly 6 balloons, once all balloons float away
 *     (balloon flies away each letter you guess wrong) the corgi will fall to his/her DOOM.
 * The dashes represent how many letters are in the secret word you need to guess, it'll auto fill as 
 *     you guess letters correctly.
 * The keyboard rendered on the bottom are letters you can guess, it will turn red if incorrect
 *     and green for the correct letters guessed. 
 * Bottom left is for the 1 hint the user gets for each word
 * The "I know the word" button can be pressed if the user knows the word and wants to make a full
 *     word guess. User inputs and if wrong, user will lose 1 life, if guessed correctly, a new word will
 *     generate
 * Lastly, the give up button if the user gives up and wants to leave the game
**/

/**
 * Inside the state:
 *  "secretWord" ==> the random word fetched from the API
    "lives" ==> number of lives remaining
    "correctChars" ==> an array of characters that are correct
    "guessedChars" ==> an array of characters that holds all the letters that the user guessed
    "gameMode" ==> random game level generated from difficulty level chosen that gets put into the API url
    "level" ==> the level the user chosen
    "fullWord" ==> the full word the user inputs when they think they know the full word
    "modalVisible" ==> boolean to check if modal should be visible or not
    "previousScore" ==> tmp score value to add previous score with current score
    "secretArray" ==> the array of words fetched from API
    "hint" ==> the character that is stored to help user when hint button is pressed
    "hintPressed"==> boolean to check if hint button was pressed, to disable it once pressed once
 */

export default class GameScreen extends React.Component {
    constructor(props) {
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
            "previousScore": 0,
            "secretArray": [],
            "hint": "",
            "hintPressed": false
        }
        this.showAlertDelay = this.showAlertDelay.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    // Uses gameMode variable to fetch the right array of words from the API. Sets the array into state.
    componentDidMount(){
        let gameMode = this.findLevel()
        return fetch(`http://app.linkedin-reach.io/words?difficulty=${gameMode}`)
            .then((response) => {
                let wordArray = response._bodyText.split('\n');
                this.setState({
                    "secretArray": wordArray
                })
            })
            .then(() => {
                this.init();
            })
            .catch((error) => {
                console.error(error);
            }
        );
    }

    /**
     * Helper function to render the dashes. Will find the length of the secret word, and stores that length of dashes
     * into the correctChars array, which will later be swapped with letters that are guessed correctly
     */
    init(){
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (this.state.secretArray.length))];
        let correctChars = [];
        for(let i = 0; i < secretWord.length; i++){
            correctChars.push("_");
        }
        this.setState({
            correctChars,
            secretWord
        })
    }

    /** 
     * Once a letter is pressed on the keyboard, it'll check if the letter exists in guessedChars array, if not
     * it'll get validated.
    */
    onKeyPress(letter){
        let guessedChars = this.state.guessedChars;
        if(guessedChars.indexOf(letter)==-1){
          this.validateLetter(guessedChars, letter);
        }else{
          return;
        }
    }

    /**
     * The letter will be pushed into the guessedChars array, check in the secretWord string to see 
     * if that letter pushed exists, if so, swap that letter with a dash in correctChars array, if not
     * subtract a life. Lastly check if the array of correctChars = secretWord
     */
    validateLetter(guessedChars, letter){
        guessedChars.push(letter);
        let { correctChars, secretWord, lives } = this.state;
        if(secretWord.toUpperCase().indexOf(letter)!=-1){
            for(let i = 0; i < secretWord.length; i++){
                if(secretWord[i].toUpperCase() == letter)
                    correctChars[i] = letter;
            }
        }else{
            lives = lives - 1;
            if(lives == 0){
                this.showAlertDelay();
            }
        }
        this.setState({
            correctChars,
            lives,
            guessedChars,
        })
        if(correctChars.join("").toLowerCase() == secretWord){
            this.newGame();
        }
    }

    /**
     * Helper function to parse through correctChars array, find the index of the letters that have not
     * been guessed and set hint to that letter index from the secretWord.
     */
    giveHint(){
        let { secretWord, correctChars, hintChar } = this.state;
        if(this.state.hintPressed === false){
            for(let i = 0; i<secretWord.length; i++){
                if(correctChars[i] == '_'){
                    hintChar = secretWord[i];
                    i = secretWord.length ;
                }
            }
        }
        return(hintChar.toUpperCase());
    }

    /**
     * Helper function to compare the full word inputted by user with the secretWord.
     */
    checkFullWord(){
        if(this.state.secretWord == this.state.fullWord.toLowerCase()){
            this.newGame();
        }else if(this.state.fullWord.trim() === ""){
            return ;
        }else{
            this.setState({
                "lives": this.state.lives - 1
            })
        }
    }

    /**
     * Helper function to use the level prop passed from Welcome screen to get a number of difficulty
     * for the api fetch request. Since level is 1-10: 
     * easy was assigned to 1-3, medium 4-6, hard 7-10. GameMode is the result of a random number
     * generated between those numbers for each level.
     */
    findLevel(){
        const { navigation } = this.props;
        const level = navigation.getParam('level', 'no-level');
        let gameMode;
        if(level == "easy"){
            gameMode = Math.ceil(Math.random() * 3);
        }else if(level == "medium"){
            gameMode = 3 + Math.ceil(Math.random() * 3);
        }else{
            gameMode = 6 + Math.ceil(Math.random() * 3);
        }
        return gameMode;
    }

    /**
     * Function to create a new game. resets everything except for the previous score because
     * I wanted to score to add up for lives saved. This is specifically for when the user
     * guesses the right word and moves onto next word (a new game)
     */
    newGame() {
        let newScore = this.state.previousScore + this.state.lives;
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (this.state.secretArray.length))];
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

    /**
     * Function to reset game completely including score. This is used specifically for when the User
     * loses and needs to start over from the beginning
     */
    resetGame() {
        let secretWord = this.state.secretArray[Math.floor(Math.random() * (this.state.secretArray.length))];
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

    /**
     * Helper functiont o delay the alert box so that the corgi falling animation can be properly shown.
     */
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
        }, 1500);
    }
    
    static navigationOptions = {
        header: null
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        
        let corgi = <Image source={Hangman} duration={8000} style={{bottom: 50, height: 100, left: 30,width: 100, position: "relative"}}/>
        let corgiFall = <Image animation={'fadeOutDownBig'} duration={2000} source={Hangman} style={{bottom: 50, height: 100,left: 30, width: 100, position: "relative"}}/>
        let balloon0 = <Image source={balloon} style={{left: 50, top: 10, height: 100, width: 30, position: "relative"}} />
        let balloon0fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{left: 50, top: 10, height: 100, width: 30,position: "relative"}}/>
        let balloon1 = <Image source={balloon} style={{height: 100, left:45, width: 30, position: "relative"}}/>
        let balloon1fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{height: 100, left: 45,width: 30, position: "relative"}}/>
        let balloon2 = <Image source={balloon} style={{right: 10, bottom: 10, height: 100, width: 30,position: "relative"}}/>
        let balloon2fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{right:10, bottom:10, height: 100, width: 30,position: "relative"}}/>
        let balloon3 = <Image source={balloon} style={{right:25, top:25, height: 100, width: 30, position: "relative"}}/>
        let balloon3fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{right:25, top:25, height: 100, width: 30, position: "relative"}}/>
        let balloon4 = <Image source={balloon} style={{right: 45, top:10, height: 100, width: 30, position: "relative"}}/>
        let balloon4fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{right: 45, top:10, height: 100, width: 30, position: "relative"}}/>
        let balloon5 = <Image source={balloon} style={{right: 80, bottom: 20, height: 100, width: 30, position: "relative"}}/>
        let balloon5fly = <Image animation={'fadeOutUpBig'} duration={8000} source={balloon} style={{right: 80, bottom: 20, height: 100, width: 30, position: "relative"}}/>
        
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
                            'HINT: "' + hint + '"',
                             '',
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
                        </Text>
                    </View>
                </View>
                <View style={styles.animation}>
                    <View style={styles.balloon}>
                        {this.state.lives>5?balloon0:balloon0fly}
                        {this.state.lives>4?balloon1:balloon1fly}
                        {this.state.lives>3?balloon2:balloon2fly}
                        {this.state.lives>2?balloon3:balloon3fly}
                        {this.state.lives>1?balloon4:balloon4fly}
                        {this.state.lives>0?balloon5:balloon5fly}
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
                                                <Text key={index} style={styles.usedKeyWrong}>
                                                    {letter}
                                                    {/* X */}
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
                    >
                        <View style={{marginTop:270}}>
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
                        <Text style={{color: "yellow", fontSize: 20}}>I know the word!</Text>
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