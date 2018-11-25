import React from 'react';
import {  
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
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
            "secretWord": '',
            // "numOfTries": 6,
            // "usedChars": [],
            // "unusedChars": [],
            // "answer": "",

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
    
    
    render() {
        
        const { navigation } = this.props;
        const level = navigation.getParam('level', 'no-level');
        const username = navigation.getParam('username', 'no-username');

        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => { this.fetchSecretWord() }}>
              <Text>Click Me</Text>
            </TouchableOpacity>
            
                
            <Text>SecretWord: {this.state.secretWord}</Text>
            <Text>level: {level}</Text>
            <Text>username: {username}</Text>
          </View>
        );
    }
    keyboardRender() {
        return(
            <View>
                <Text>
                    hi
                </Text>
            </View>
        )

    }
}
    
    

