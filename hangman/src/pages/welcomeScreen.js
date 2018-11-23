import React from 'react';

import {  
    TouchableOpacity,
 } from 'react-native';

import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/welcomeStyles';
import bgImg from '../images/hangman.gif';
import metrics from '../config/metrics';

export default class Index extends React.Component {
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
                    <Text style={styles.logoText}> HANG MAN </Text>
                    <TouchableOpacity style={styles.start}>
                    <Text>START</Text>
                    </TouchableOpacity>
                </View>
             </View>
        )
    }

}