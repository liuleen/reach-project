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
        fontSize: 65,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 10,
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
        backgroundColor: 'white',
        width: WIDTH,
        height: 450
      },
    levelContainer: {
        paddingTop: 10,
        backgroundColor: 'white',
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
    },
    pickerStyle: {
        marginTop:10,
    },
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
  });