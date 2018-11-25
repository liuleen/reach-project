import React from 'react';

import { 
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Picker
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Image, Text, View } from 'react-native-animatable'
import styles from '../styles/welcomeStyles';
import bgImg from '../images/hangman.gif';
import Dialog, { 
    DialogContent,
    DialogButton
} from 'react-native-popup-dialog';
import AutoTypingText from 'react-native-auto-typing-text';

export default class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.inputRefs = {};
        this.inputRef = React.createRef()
        this.state = {
            "level": undefined,
            "dialog": false,   
            "username": ''     
        };
    }

    render(){
        console.log(this.state)
        return(
            <View style={styles.container} behavior="padding">
                <View style={styles.logoContainer}>
                    <Image
                        animation={'slideInDown'}
                        duration={1200}
                        delay={200}
                        style={styles.logoImg}
                        source={bgImg}
                    />
                    <AutoTypingText
                        text={`HANGMAN`}
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
                                    dialog: true,                                
                                });
                            }}
                        >
                            <Text style={styles.buttonText}> START </Text>
                        </TouchableOpacity>
                        <Dialog
                            // onDismiss={() => {
                            //     this.setState({ dialog: false });
                            // }}
                            onTouchOutside={() => {
                                this.setState({ dialog: false });
                            }}
                            //zIndex controls which components display on top of others. The higher the number, the more on top
                            zIndex={1000}
                            backgroundStyle={styles.dialog}
                            dialogStyle={styles.dialogStyle}
                            visible={this.state.dialog}

                            actions={[
                                <DialogButton
                                    text="PLAY"
                                    onPress={() => {
                                        this.props.navigation.navigate('GameScreen', {
                                            level: this.state.level,
                                            username: this.state.username
                                        } ),
                                        this.setState({dialog: false})
                                    }}
                                    key="button-1"
                                    style={styles.dialogButton}
                                />,
                            ]}
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
                                            onChangeText={(username) => this.setState({username})}
                                            // onSubmitEditing={() => {
                                            //     this.inputRefs.level.focus();
                                            // }}
                                            style={styles.inputIOS}
                                            blurOnSubmit={true}
                                        />

                                        <View style={{ paddingVertical: 5 }} />
                                        
                                        <View styles={styles.container}>
                                            <Picker
                                                // ref ={(ref) => {this.inputRefs.level = ref}}
                                                withRef={true}
                                                style={styles.pickerStyle}
                                                selectedValue={this.state.level}
                                                onValueChange={(itemValue,itemIndex) => this.setState({level:itemValue})}
                                                >
                                                <Picker.Item label="Select a level" value=""/>
                                                <Picker.Item label="Noob" value="easy"/>
                                                <Picker.Item label="Novice" value="medium" />
                                                <Picker.Item label="Expert" value="hard"/>
                                                <Picker.Item label="Master" value="challenge"/>
                                            </Picker>                                        
                                        </View>
                                    </View>               
                                </View>             
                            </DialogContent>
                            <KeyboardSpacer/>
                        </Dialog>
                    </View>
                </View>
            </View>
        )
    }

}

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingTop: 13,
//         paddingHorizontal: 10,
//         paddingBottom: 12,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         backgroundColor: 'white',
//         color: 'black',
//     },
// });