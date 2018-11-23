import { 
    StyleSheet, 
} from 'react-native';

import metrics from '../config/metrics'

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
        margin: 10,
        color: "black",
    },
    start: {
        textAlign: 'center',
        color: 'red',
        marginBottom: 5,
    },
  });
  