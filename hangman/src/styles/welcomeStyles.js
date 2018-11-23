import { 
    StyleSheet, 
    Dimensions
} from 'react-native';

const window = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;
/**
 * css stylesheet for the welcome screen 
 */

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 100,
        fontWeight: "bold",
        textAlign: 'center',
        // margin: 10,
        color: "black",
    },
    button: {
        width: WIDTH,
        height: 80,
        borderRadius: 0,
        backgroundColor: 'green',
        justifyContent: 'center',
        marginBottom: 80
    },
    buttonText: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dialogContentView: {
        paddingLeft: 18,
        paddingRight: 18,
      },
    customBackgroundDialog: {
        opacity: 0.5,
        width: WIDTH
      },
    dialogStyle: {
        backgroundColor: 'black',
        width: WIDTH,
        height: 250
      },
    levelContainer: {
        paddingTop: 10,
        backgroundColor: 'black',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    dialogButton: {
        width: WIDTH - 100,
        height: 50,
        backgroundColor: 'lime',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 45,
        marginRight: 45,
        marginTop: 13
    }
  });