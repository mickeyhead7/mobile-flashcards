import { black, grey, white } from '../consts/colors';
import { StyleSheet } from 'react-native';

/**
 * @description Form styles
 */
const styles = StyleSheet.create({
    button: {
        backgroundColor: black,
        borderRadius: 2,
        padding: 20,
    },
    buttonHollow: {
        backgroundColor: 'transparent',
        borderColor: black,
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 16,
    },
    buttonText: {
        color: white,
        fontWeight: 'bold',
        textAlign: 'center', 
    },
    buttonTextHollow: {
        color: black,     
        fontWeight: 'bold',  
        textAlign: 'center', 
    },
    input: {
        backgroundColor: white,
        borderColor: grey,
        borderWidth: 1,
        height: 60,
        marginBottom: 20,
        padding: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default styles;
