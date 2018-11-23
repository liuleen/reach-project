import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

import {  
    Alert,
    Button,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';

import {createStackNavigator} from 'react-navigation';
import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/welcomeStyles';
import bgImg from '../images/hangman.gif';
import Dialog, { 
    DialogContent,
    DialogButton
} from 'react-native-popup-dialog';
import AutoTypingText from 'react-native-auto-typing-text';

// const App = createStackNavigator({
//     Welcome: {screen: WelcomeScreen},
//     Game: {screen: GameScreen},
// });

export default class index extends React.Component {
    constructor(props) {
        super(props);

        this.inputRefs = {};

        this.state = {
            level: undefined,
            items: [
                {
                    label: 'Noob',
                    value: 'easy',
                },
                {
                    label: 'Rookie',
                    value: 'medium'
                },
                {
                    label: 'Expert',
                    value: 'hard',
                },
                {
                    label: 'Master',
                    value: 'challenge',
                },
            ],
            customBackgroundDialog: false,          
        };
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
                        charMovingTime={150}
                        delay={150}
                        style={styles.logoText}
                        onComplete={() => { console.log('woohoo'); }}
                    />
                    <View animation={'fadeInUpBig'} delay={1500} duration={300}>
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
                            //zIndex controls which components display on top of others. The higher the number, the more on top
                            zIndex={1000}
                            backgroundStyle={styles.customBackgroundDialog}
                            dialogStyle={styles.dialogStyle}
                            visible={this.state.customBackgroundDialog}
                        >
                            <DialogContent>
                                <View style={styles.dialogContentView}>
                                    <View style={styles.levelContainer}>
                                        <Text>Choose a Username</Text>
                                        <TextInput
                                            ref={(el) => {
                                                this.inputRefs.name = el;
                                            }}
                                            placeholder="username"
                                            returnKeyType="next"
                                            enablesReturnKeyAutomatically
                                            onSubmitEditing={() => {
                                                this.inputRefs.picker.togglePicker();
                                            }}
                                            style={pickerSelectStyles.inputIOS}
                                            blurOnSubmit={false}
                                        />

                                        <View style={{ paddingVertical: 5 }} />

                                        <Text>Choose a Level</Text>
                                        <RNPickerSelect
                                            placeholder={{
                                                label: 'Select a level...',
                                                value: null,
                                            }}
                                            items={this.state.items}
                                            onValueChange={(value) => {}}
                                            style={{ ...pickerSelectStyles }}
                                            ref={(el) => {
                                                this.inputRefs.picker = el;
                                            }}
                                            onSubmitEditing={(value) => {
                                                this.setState({
                                                    level: value,
                                                });
                                            }}
                                            value={this.state.level}
                                        />
                                    </View>
                                </View>
                            </DialogContent>
                            <DialogButton
                                text="PLAY"
                                onPress={() => {
                                    
                                }}
                                key="button-1"
                                style={styles.dialogButton}
                                />
                        </Dialog>
                    </View>
                </View>
            </View>
        )
    }

}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});