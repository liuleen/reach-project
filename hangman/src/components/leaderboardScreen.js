import React from 'react';
import {  
    Alert,
    TouchableOpacity,
    ImageBackground,
    View,
    Text,
    AsyncStorage,
    FlatList,
 } from 'react-native';

import styles from '../styles/leaderboardStyles';
import bgImg from '../images/leaderboard.gif';

/**
 * The Leaderboard Screen Component of the application
 * I learned about persistent data and AsyncStorage during 
 * my interview and wanted to try and create it on my own.
 * 
 * I will just be grabbing the username and scores from the parent
 * component passed as props to this child component, save it
 * in the asyncStorage and display it using a FlatList prop
 * 
 * AsyncStorage is a simple, unencrypted, asynchronous, persistent, 
 * key-value storage system that is global to the app. 
 * 
 * On iOS, AsyncStorage is backed by native code that stores small 
 * values in a serialized dictionary and larger values in separate 
 * files. On Android, AsyncStorage will use either RocksDB or SQLite 
 * based on what is available.
 * 
 * The scores will be displayed from highest to lowest. 
 * Decided not to store scores that are <2
**/

/**
 * Inside the state:
 *  i need to store an array of objects to be rendered inside the FlatList div
 */
export default class ChallengeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const username = navigation.getParam('username', 'no-username');
        const score = navigation.getParam('score', 'no-score');
        const level = navigation.getParam('level', 'no-level');
        console.log("level", level)
        this.state = {
            "noobLeaderbd": [],
            "noviceLeaderbd": [],
            "expertLeaderbd": [],
            "challengeLeaderbd": [],
            "username": username,
            "score": score,
            "level": level
        }

    }

    static navigationOptions = {
        title : "Leader Board"
    };

    componentDidMount(){
        this.saveData();
    }

    saveData = async() => {
        // if(this.state.score <= 2){
            
        // }
        if(this.state.level == "easy"){
            this.saveNoobData();
        }else if(this.state.level == "medium"){
            this.saveNoviceData();
        }else if(this.state.level == "hard"){
            this.saveExpertData();
        }else{
            this.saveChallengeData();
        }
    }

    saveNoobData = async() => {
        let userScore = {
            username: this.state.username,
            score: this.state.score
        }
        let existingLeaderboard;
        try{
            existingLeaderboard = await AsyncStorage.getItem("noobLd")
        }catch(error){
            console.log("error retrieving noob leaderboard: ", error)
        }
        let existingLdb = JSON.parse(existingLeaderboard)
        if(!existingLdb){
            existingLdb = []
        }
        if(this.state.score >= 2){
            existingLdb.push(userScore);
        }

        try{
            await AsyncStorage.setItem('noobLd', JSON.stringify(existingLdb) )
        }catch(error){
            console.log("error storing noob leaderboard", error)
        } 
        this.retrieveData();
    }

    saveNoviceData = async() => {
        let userScore = {
            username: this.state.username,
            score: this.state.score
        }
        let existingLeaderboard;
        try{
            existingLeaderboard = await AsyncStorage.getItem("noviceLd")
        }catch(error){
            console.log("error retrieving novice leaderboard: ", error)
        }
        let existingLdb = JSON.parse(existingLeaderboard)
        if(!existingLdb){
            existingLdb = []
        }
        if(this.state.score >= 2){
            existingLdb.push(userScore);
        }

        try{
            await AsyncStorage.setItem('noviceLd', JSON.stringify(existingLdb))
        }catch(error){
            console.log("error storing novice leaderboard", error)
        }
        this.retrieveData();
    }

    saveExpertData = async() => {
        let userScore = {
            username: this.state.username,
            score: this.state.score
        }
        let existingLeaderboard;
        try{
            existingLeaderboard = await AsyncStorage.getItem("expertLd")
        }catch(error){
            console.log("error retrieving expert leaderboard: ", error)
        }
        let existingLdb = JSON.parse(existingLeaderboard)
        if(!existingLdb){
            existingLdb = []
        }
        if(this.state.score >= 2){
            existingLdb.push(userScore);
            console.log("this is the push into existinglb", existingLdb)
        }
        console.log("don't push scores less than 2", existingLdb)

        try{
            await AsyncStorage.setItem('expertLd', JSON.stringify(existingLdb))
        }catch(error){
            console.log("error storing expert leaderboard", error)
        }
        this.retrieveData();
    }

    saveChallengeData = async() => {
        let userScore = {
            username: this.state.username,
            score: this.state.score
        }
        let existingLeaderboard;
        try{
            existingLeaderboard = await AsyncStorage.getItem("challengeLd")
        }catch(error){
            console.log("error retrieving challenge leaderboard: ",error)
        }
        let existingLdb = JSON.parse(existingLeaderboard)
        if(!existingLdb){
            existingLdb = []
        }
        if(this.state.score >= 2){
            existingLdb.push(userScore);
        }

        try{
            await AsyncStorage.setItem('challengeLd', JSON.stringify(existingLdb))
        }catch(error){
            console.log("error storing challenge leaderboard", error)
        }
        this.retrieveData();
    }

    retrieveData = async() => {
        let noob = await AsyncStorage.getItem('noobLd');
        let novice = await AsyncStorage.getItem('noviceLd');
        let expert = await AsyncStorage.getItem('expertLd');
        let challenge = await AsyncStorage.getItem('challengeLd');

        let objnoob = JSON.parse(noob);
        let objnovice = JSON.parse(novice);
        let objexpert = JSON.parse(expert);
        let objchallenge = JSON.parse(challenge);
        console.log("objexpert", objexpert)
        // objnoob.sort(function(a, b){
        //     return b.score - a.score
        // })
        // objnovice.sort(function(a, b){
        //     return b.score - a.score
        // })
        // objexpert.sort(function(a, b){
        //     return b.score - a.score
        // })
        // objchallenge.sort(function(a, b){
        //     return b.score - a.score
        // })

        // console.log("sortedexpert", sortedexpert)

        this.setState({
            "noobLeaderbd": objnoob,
            "noviceLeaderbd": objnovice,
            "expertLeaderbd": objexpert,
            "challengeLeaderbd": objchallenge
        })
    }


    render(){
        return(
            // <ImageBackground source={bgImg} style={styles.imgContainer}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>
                            Noob Level Highscores
                        </Text>
                        <FlatList
                            data={this.state.noobLeaderbd}
                            renderItem={({item}) => 
                                <Text style={styles.listText}>
                                    {item.username} : {item.score}
                                </Text>}
                        />
                        
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            Novice Level Highscores
                        </Text>
                        <FlatList
                            data={this.state.noviceLeaderbd}
                            renderItem={({item}) => 
                                <Text style={styles.listText}>
                                    {item.username} : {item.score}
                                </Text>}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            Expert Level Highscores
                        </Text>
                        <FlatList
                            data={this.state.expertLeaderbd}
                            renderItem={({item}) => 
                                <Text style={styles.listText}>
                                    {item.username} : {item.score}
                                </Text>}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            Challenge Level Highscores
                        </Text>
                        <FlatList
                            data={this.state.challengeLeaderbd}
                            renderItem={({item}) => 
                                <Text style={styles.listText}>
                                    {item.username} : {item.score}
                                </Text>}
                        />
                    </View>
                </View>
            // </ImageBackground>
        )
    }
}
