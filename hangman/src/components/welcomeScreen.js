import React from 'react';

import { 
    TouchableOpacity,
    TextInput,
    Picker,
    ImageBackground
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Image, Text, View } from 'react-native-animatable';
import styles from '../styles/welcomeStyles';
import logoImg from '../images/hangmanpng.gif'; 
import bgImg from '../images/back8.gif';
import Dialog, { 
    DialogContent,
    DialogButton
} from 'react-native-popup-dialog';
import AutoTypingText from 'react-native-auto-typing-text';

/**
 * The Welcome component of the application.
 * The first page the user sees, User can press the START button.
 * The START button will open up a dialog that prompts the user to input a username and 
 *     select a level. There are three difficulty levels and one challenge level
**/

export default class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "level": undefined,
            "dialog": false,   
            "username": '',
            "nameError": "",
            "levelError": ""   
        };
    }

    static navigationOptions = {
        header: null
    };  

    render(){
        return(
            <View style={styles.container}>
                <Image
                    animation={'slideInDown'}
                    duration={1200}
                    delay={200}
                    style={styles.logoImg}
                    source={logoImg}
                />
                <ImageBackground source={bgImg} style={styles.imgContainer}>
                    <AutoTypingText
                        text={`HANGMAN`}
                        charMovingTime={200}
                        delay={150}
                        style={styles.logoText}
                    />
                    <AutoTypingText
                        text={` -  -  -  -  -  -  -`}
                        charMovingTime={5}
                        delay={5}
                        style={styles.dashText}
                    />         
                    <View animation={'fadeInUpBig'} delay={2000} duration={300}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.setState({
                                    "dialog": true,
                                    "username": "",
                                    "levelError": "",
                                    "nameError": ""                              
                                });
                            }}
                        >
                            <Text style={styles.buttonText}> START </Text>
                        </TouchableOpacity>
                        <Dialog
                            onTouchOutside={() => {
                                this.setState({ dialog: false });
                            }}
                            dialogStyle={styles.dialogStyle}
                            visible={this.state.dialog}
                            actions={[
                                <DialogButton
                                    text="PLAY"
                                    onPress={() => {
                                        if (this.state.username.trim() === "") {
                                            this.setState(() => ({ nameError: "Username required." }));
                                        } else if (this.state.level == undefined || this.state.level == "") {
                                            this.setState(() => ({ levelError: "Level required." }));
                                        } else if(this.state.level == "challenge"){
                                            this.props.navigation.navigate('ChallengeScreen', {
                                                level: this.state.level,
                                                username: this.state.username
                                            })
                                            this.setState({dialog: false})
                                        } else{
                                            this.props.navigation.navigate('GameScreen', {
                                                level: this.state.level,
                                                username: this.state.username
                                            })
                                            this.setState({dialog: false})
                                        }
                                    }}
                                    key="button"
                                    style={styles.dialogButton}
                                />
                            ]}
                        >
                            <DialogContent>
                                <View style={styles.dialogContentView}>
                                    <Text style={styles.usernameText}>Choose a Username</Text>
                                    <TextInput
                                        placeholder="username"
                                        returnKeyType="next"
                                        enablesReturnKeyAutomatically
                                        onChangeText={(username) => this.setState({username})}
                                        style={styles.usernameInput}
                                        blurOnSubmit={true}
                                    />
                                    {!!this.state.nameError && (
                                        <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                    )}
                                    <Picker
                                        withRef={true}
                                        style={styles.pickerStyle}
                                        selectedValue={this.state.level}
                                        onValueChange={(itemValue,itemIndex) => this.setState({level:itemValue})}
                                        >
                                        <Picker.Item color= "white" label="Select a level" value=""/>
                                        <Picker.Item color= "white" label="Noob" value="easy"/>
                                        <Picker.Item color= "white" label="Novice" value="medium" />
                                        <Picker.Item color= "white" label="Expert" value="hard"/>
                                        <Picker.Item color= "white" label="Challenge" value="challenge"/>
                                    </Picker>
                                    {!!this.state.levelError && (
                                    <Text style={{ color: "red" }}>{this.state.levelError}</Text>
                                    )}                                       
                                </View>             
                            </DialogContent>
                            <KeyboardSpacer/>
                        </Dialog>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}