import { StyleSheet } from 'react-native';
import { red, green } from '../consts/colors';

/**
 * @description Quiz styles
 */
const styles = StyleSheet.create({
    buttonCorrect: {
        backgroundColor: green,
        marginBottom: 20,
    },
    buttonIncorrect: {
        backgroundColor: red,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    count: {
        textAlign: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    toggle: {
        marginBottom: 20,
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
    },
});

export default styles;
