import React from 'react';

import {  
    StyleSheet
 } from 'react-native';

import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/levelStyles';
// import bgImg from '../images/hangman.gif';
// import metrics from '../config/metrics';
// import AutoTypingText from 'react-native-auto-typing-text';
import { Login } from 'react-native-md-motion-buttons';

export default class LevelScreen extends React.Component {
    render() {
        return (
            <View style={[StyleSheet.absoluteFill, styles.container]}>
            <Text style={styles.welcome}>
                New screen
            </Text>
            <Button title="Reset" onPress={this.props.logout} />
    
        </View>)
    }
}