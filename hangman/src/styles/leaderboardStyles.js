import { 
    StyleSheet, 
    Dimensions
} from 'react-native';

/**
 * css stylesheet for the leaderboard screen 
 */

const { width: WIDTH } = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 2;

export default StyleSheet.create({
    container:{
        backgroundColor: "black",
    },
    // imgContainer: {
    //     width: WIDTH,
    //     height: 200,
    //   },
    titleText:{
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    
    },
    listText:{
        color: "white",
        fontSize: 15
    }
});
  