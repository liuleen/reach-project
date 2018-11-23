import { 
    StyleSheet, 
    Dimensions
} from 'react-native';

import metrics from '../config/metrics'

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
        // alignItems: 'center',
        // backgroundColor: 'black',
        // padding: 20
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
    }
  });
  