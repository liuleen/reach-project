import React from 'react';

import {  
    Alert,
    Button,
    TouchableOpacity
 } from 'react-native';

import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/welcomeStyles';
import bgImg from '../images/hangman.gif';
import metrics from '../config/metrics';
import AutoTypingText from 'react-native-auto-typing-text';

// import levelScreen from './levelScreen'

export default class index extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        animation={'slideInDown'}
                        duration={1200}
                        delay={200}
                        style={styles.logoImg}
                        source={bgImg}
                    />
                    <AutoTypingText
                        text={`HANG MAN`}
                        charMovingTime={200}
                        delay={200}
                        style={styles.logoText}
                        onComplete={() => { console.log('woohoo'); }}
                    />
                    <View animation={'fadeInUpBig'} delay={2000} duration={400}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                        >
                            <Text style={styles.buttonText}> START </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}