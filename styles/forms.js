import { black, grey, white } from '../consts/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        backgroundColor: black,
        padding: 20,
    },
    buttonText: {
        color: white,        
    },
    input: {
        borderColor: grey,
        borderWidth: 1,
        height: 60,
        marginBottom: 40,
    },
});

export default styles;
