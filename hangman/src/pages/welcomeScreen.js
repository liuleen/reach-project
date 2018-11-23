import React from 'react';

import {  
    Alert,
    Button,
    TouchableOpacity
 } from 'react-native';

import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/welcomeStyles';
import bgImg from '../images/hangman.gif';
import Dialog, { 
    DialogTitle,
    DialogContent,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import AutoTypingText from 'react-native-auto-typing-text';

// import levelScreen from './levelScreen'

export default class index extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        customBackgroundDialog: false,
    };

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
                            onPress={() => {
                                this.setState({
                                    customBackgroundDialog: true,                                
                                });
                            }}
                        >
                            <Text style={styles.buttonText}> START </Text>
                        </TouchableOpacity>
                        <Dialog
                            onDismiss={() => {
                                this.setState({ customBackgroundDialog: false });
                            }}
                            onTouchOutside={() => {
                                this.setState({ customBackgroundDialog: false });
                            }}
                            zIndex={1000}
                            backgroundStyle={styles.customBackgroundDialog}
                            dialogStyle={styles.dialogStyle}
                            dialogTitle={
                                <DialogTitle
                                    title="PLEASE CHOOSE A LEVEL"
                                    hasTitleBar={false}
                                    textStyle={styles.dialogText}
                                />
                            }
                            visible={this.state.customBackgroundDialog}
                        >
                            <View style={styles.dialogContentView}>
                                <Text style={styles.dialogText}>Custom backgroundStyle</Text>
                            </View>
                        </Dialog>
                   
                    </View>
                </View>
            </View>
        )
    }

}