import React from 'react';

import { 
    TouchableOpacity,
    TextInput,
    Picker,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Image, Text, View } from 'react-native-animatable';
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
            "username": '',
            "nameError": "",
            "levelError": ""   
        };
    }

    static navigationOptions = {
        header: null
    };

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
                        charMovingTime={300}
                        delay={250}
                        style={styles.logoText}
                    />
                    <AutoTypingText
                        text={` -  -  -  -  -  -  -`}
                        charMovingTime={5}
                        delay={5}
                        style={styles.dashText}
                    />         
                    <View animation={'fadeInUpBig'} delay={2800} duration={300}>
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
                                        if (this.state.username.trim() === "") {
                                            this.setState(() => ({ nameError: "Username required." }));
                                        } else if (this.state.level == undefined || this.state.level == "") {
                                            this.setState(() => ({ levelError: "Level required." }));
                                        } else if(this.state.level == "challenge"){
                                            this.props.navigation.navigate('ChallengeScreen', {
                                                level: this.state.level,
                                                username: this.state.username
                                            } )
                                            this.setState({dialog: false})
                                        }else{
                                            this.props.navigation.navigate('GameScreen', {
                                                level: this.state.level,
                                                username: this.state.username
                                            } )
                                            this.setState({dialog: false})
                                        }
                                    }}
                                    key="button-1"
                                    style={styles.dialogButton}
                                />,
                            ]}
                        >
                            <DialogContent>
                                <View style={styles.dialogContentView}>
                                    <View style={styles.levelContainer}>
                                        <Text style={styles.usernameText}>Choose a Username</Text>
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
                                        {!!this.state.nameError && (
                                            <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                                        )}
                                        
                                        <View styles={styles.container}>
                                            <Picker
                                                // ref ={(ref) => {this.inputRefs.level = ref}}
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