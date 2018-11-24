import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export const getSecretWord = () => {
    constructor(props) {
        super(props);
        this.state = {
            secretWord: ''
        }
    }

    let response = await fetch('http://app.linkedin-reach.io/words')
    let responseJson = await response.json();
    this.setState({
        secretWord: responseJson['words']
    })
}