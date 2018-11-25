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

    // async fetchSecretWord() {
    //     try{
    //         let response = await fetch('http://app.linkedin-reach.io/words');
    //         console.log(response);
    //         let responseJson = await response.json();
    //         console.log(responseJson.words)
    //         // this.setState({
    //         //     secretWord: responseJson['words']
    //         // })
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    
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

    }
}
    
    

