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
    // justifyContent: 'center',
    flexDirection: 'column',
    paddingRight:20
  },
  // headerContainer: {
  //   flexDirection: 'column'
  // },
  gameTitle:{
    fontSize:35,
    borderBottomWidth:1,
    marginTop:50,
    color: "white",
    fontWeight: "bold"
  },
  information: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  livesText: {
    fontSize:20,
    fontWeight:"bold",
    color: "white",
    alignSelf: 'flex-start'
  },
  scoreText: {
    fontSize:20,
    fontWeight:"bold",
    color: "white",
    alignSelf: 'flex-end'
  },
  animation: {

  },
  balloon: {
    flexDirection: 'row',
    // flexWrap: 'wrap'
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
    // flexWrap:"wrap"
  },
  dashItemContainer:{
    // flex:0,
    padding:5,
    margin:2,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dashItem:{
    width:23,
    color: 'white',
    fontWeight: "bold",
    fontSize:23,
  },
  keyboard: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection:"column",
    // position: "fixed"
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
  usedKey:{
    color:"#cccccc",
    fontSize:20,
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
    // maxHeight: 20,
    // maxWidth: 20
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
    // justifyContent: "space-between",
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
    // alignSelf: 'flex-start',
  },
  fullWord: {
    height: 70, 
    width: WIDTH,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 5,
    color:"yellow",
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
    alignSelf: 'flex-end',
  },
  submitFullWord: {
    width:150,
    height:50,
    borderWidth:5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#64b260"
  },
  nevermind: {
    width: 150,
    height: 50,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#871825"
  },
});
  