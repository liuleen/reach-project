import { 
    StyleSheet, 
} from 'react-native';

/**
 * css stylesheet for the main game screen 
 */

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitleView:{
    flexDirection:"row"
  },
  gameTitle:{
    fontSize:35,
    borderBottomWidth:1,
    margin:10
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
  keyItemUsed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2,
    borderWidth: .5,
    borderColor: "black",
    backgroundColor: "#b3ffb3"
  },
  keyItemUsedWrong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    margin:2,
    borderWidth: .5,
    borderColor: "black",
    backgroundColor: "#ff9999"
  },
  usedKey:{
    color:"#cccccc",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter:{
    color:"white",
    fontSize:20,
    fontWeight: "bold",
    width:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameBtn: {
    color: '#841584',
    fontSize:25,
    margin:10
  },
  dashInputStyle:{
    height: 40, 
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
    flexWrap:"wrap"
  },
  dashItemContainer:{
    flex:0,
    padding:5,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItem:{
    width:20,
    color: 'white',
    fontWeight: "bold",
    fontSize:25,
  },
  dashBlankItem:{
    width:20,
    fontSize:20,
  },
  hintContainer:{
    flexWrap: 'wrap',
    alignItems: "flex-start",
    padding:10,
    backgroundColor:"lightgrey"
  },
  hintText:{
    fontSize:18,
    fontWeight:"500",
  },
  scoreText:{
    fontSize:13,
    textAlign:"right",
    fontWeight:"500",
    justifyContent:"flex-end",
    width:"100%"
  },
  footerButtons: {
    height: 20,
    marginBottom:60,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  giveUpTxt: {
    fontSize:20,
    fontWeight: "bold",
  },
  helpTxt: {
    fontSize:20,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1
  },
  imgContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  information: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  fullWord: {
    height: 40, 
    width: 200,
    borderColor: 'black',
    borderWidth: 5
  }
});
  