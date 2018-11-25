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
            "secretWord": '',
            "numOfTries": 6,
            "usedChars": [],
            "unusedChars": [],
            "answer": "",

        }
    }

    componentDidMount(){
        return fetch('http://app.linkedin-reach.io/words?difficulty=5&count=6')
            .then((response) => {
                let wordArray = response._bodyText.split('\n');
                let word = wordArray[Math.floor(Math.random() * (wordArray.length -1))];
                this.setState({"secretWord": word})
            })
            .catch((error) =>{
                console.error(error);
            });
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

                <View style={styles.keyboard}>
                    {keysRows.map((keys,rowIndex)=>{
                        return(
                            <View key={rowIndex} style={styles.keyboardRow}>
                                {keys.map((letter,index)=>{
                                    if(letter==" "){
                                        return <Text key={index}> </Text>
                                    }else if(this.state.usedChars.indexOf(letter)!=-1){
                                        return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
                                    }else{
                                        return <TouchableOpacity
                                            style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text>
                                        </TouchableOpacity>
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
    
    

