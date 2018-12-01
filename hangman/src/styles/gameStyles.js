import { 
    StyleSheet, 
    Dimensions
} from 'react-native';

/**
 * css stylesheet for the main game screen 
 */

const { width: WIDTH } = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;

export default StyleSheet.create({
  imgContainer: {
    flex: 1,
    width: 400,
    height: 500,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
    paddingRight:20
  },
  gameTitle:{
    fontSize:35,
    marginTop:50,
    color: "black",
    fontWeight: "bold",
  },
  challengeGameTitle:{
    fontSize:35,
    marginTop:50,
    color: "white",
    fontWeight: "bold",
  },
  information: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  livesText: {
    fontSize:20,
    fontWeight:"bold",
    color: "black",
    alignSelf: 'flex-start'
  },
  challengeLivesText: {
    fontSize:20,
    fontWeight:"bold",
    color: "white",
    alignSelf: 'flex-start'
  },
  scoreText: {
    fontSize:20,
    fontWeight:"bold",
    color: "black",
    alignSelf: 'flex-end'
  },
  challengeScoreText: {
    fontSize:20,
    fontWeight:"bold",
    color: "white",
    alignSelf: 'flex-end'
  },
  balloon: {
    flexDirection: 'row',
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
  },
  dashItemContainer:{
    padding:5,
    margin:1,
  },
  dashItem:{
    width:20,
    color: 'black',
    fontWeight: "bold",
    fontSize:20,
  },
  challengeDashItem:{
    width:20,
    color: 'white',
    fontWeight: "bold",
    fontSize:20,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:"column",
  },
  keyboardRow: {
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60
  },
  keyItemUsed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2,
    height: 50,
    width:45,
    borderWidth: .5,
    borderColor: "black",
    backgroundColor: "#b3ffb3"
  },
  keyItemUsedGameOver: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2,
    height: 50,
    width:45,
    borderWidth: .5,
    borderColor: "black",
    backgroundColor: "black"
  },
  usedKey:{
    color:"#cccccc",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  usedKeyWrong:{
    color:"#cccccc",
    fontSize:20,
    // fontWeight: "bold",
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverKey:{
    color:"black",
    fontSize:20,
    // fontWeight: "bold",
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyItemUsedWrong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2,
    height:50,
    width:45,
    borderWidth: .5,
    borderColor: "black",
    backgroundColor: "#ff9999"
  },
  keyItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2,
    borderWidth: .5,
    borderColor: "black",
    backgroundColor: "black"
  },
  letter:{
    color:"white",
    fontSize:20,
    fontWeight: "bold",
    width:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtons: {
    height: 20,
    marginBottom:60,
    marginTop: 30,
    flexDirection: "row",
  },
  hintText: {
    fontSize:20,
    marginRight:40,
    fontWeight: "bold",
    color: "#64b260",
  },
  hintTextstatic: {
    fontSize:20,
    marginRight:40,
    fontWeight: "bold",
    color: "#595959",
  },
  fullWord: {
    height: 70, 
    width: WIDTH,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 5,
    color:"black",
    fontSize: 30
  },
  giveUpTxt: {
    fontSize:20,
    marginLeft:40,
    fontWeight: "bold",
    color: "#871825",
  },
  modalButtons:{
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  submitFullWord: {
    width:190,
    height:50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#64b260"
  },
  nevermind: {
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#871825"
  },
  timer: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",

  }
});
  