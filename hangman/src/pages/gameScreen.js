import React from 'react';
import {  
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
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
            secretWord: ''
        }
    }
    async fetchSecretWord() {
        try{
            console.log("pedro")
            let response = await fetch('http://app.linkedin-reach.io/words');
            console.log(response);
            console.log("eileen")
            let responseJson = await response.json();
            console.log(responseJson.words)
            // this.setState({
            //     secretWord: responseJson['words']
            // })
        } catch (err) {
            console.log("hi")
            console.error(err);
        }
    }

    
    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => { this.fetchSecretWord() }}>
              <Text>Click Me</Text>
            </TouchableOpacity>
            <Text>SecretWord: {this.state.secretWord}</Text>
          </View>
        );
    }
}
    
    

