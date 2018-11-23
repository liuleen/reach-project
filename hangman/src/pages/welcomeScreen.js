import React from 'react';

import {  
    TouchableOpacity,
    StatusBar,
 } from 'react-native';

import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/welcomeStyles';
import bgImg from '../images/hangman.gif';
import metrics from '../config/metrics';
import AutoTypingText from 'react-native-auto-typing-text';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    conponentDidMount() {
        StatusBar.setHidden(true);
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
                    <TouchableOpacity style={styles.start}>
                        <Text>START</Text>
                    </TouchableOpacity>
                </View>
             </View>
        )
    }

}