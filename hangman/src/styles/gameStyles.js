import { 
    StyleSheet, 
} from 'react-native';

/**
 * css stylesheet for the main game screen 
 */

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: 'white',
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
    // maxHeight: 20,
    // maxWidth: 20
  },
  usedKey:{
    color:"grey",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter:{
    color:"black",
    fontSize:20,
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
    color: '#841584',
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:"black"
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
  }
});
  