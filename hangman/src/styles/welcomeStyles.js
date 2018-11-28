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
        backgroundColor: '#CCE5F6'
    },
    logoImg:{
        marginTop: 50,
        height:500,
        width:500
    },
    imgContainer: {
        marginTop: 50,
        width: 400,
        height: 400,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 60,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 40,
        color: "black",
        borderBottomColor: "black",
        borderBottomWidth:1,
    },
    dashText: {
        fontSize: 52,
        fontWeight: "bold",
        textAlign: 'center',
        color: "black",
        marginBottom: 60
    },
    button: {
        width: WIDTH,
        height: 80,
        borderRadius: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
        marginBottom: 120
    },
    buttonText: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dialogStyle: {
        backgroundColor: 'black',
        width: WIDTH,
        height: 450,
    },
    dialogButton: {
        width: WIDTH - 100,
        height: 50,
        backgroundColor: 'lime',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 45,
        marginRight: 45,
        marginTop: 25
    },
    dialogContentView: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    usernameText: {
        marginTop: 10,
        marginBottom: 10,
        color: "white"
    },
    pickerStyle: {
    },
    pickerText: {
        color: "white",
    },
    usernameInput: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
  });