import { Constants } from 'expo';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import formStyles from '../styles/forms';
import deckFormStyles from '../styles/deckform';
import React, { Component } from 'react';
import { 
    Keyboard, 
    KeyboardAvoidingView, 
    StatusBar, 
    Text, 
    TextInput, 
    TouchableHighlight, 
    View 
} from 'react-native';

const DecksStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent {...props} />
        </View>
    )
};

class DeckForm extends Component {
    state = {
        title: '',
    };

    handleTitleInput = title => {
        this.setState({
            title,
        });
    };

    handleSubmit = () => {
        const title = this.state.title.trim();
        
        if (!title) {
            return;
        }

        this.props.addDeck(title).then(() => {
            Keyboard.dismiss();
            
            this.props.navigation.navigate(
                'Deck',
                {
                    title,
                }
            );
        });
    };

    render () {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={deckFormStyles.container}>
                    <DecksStatusBar barStyle="light-content" />
                    <Text style={deckFormStyles.label}>What is the title of your new deck?</Text>
                    <TextInput
                        style={formStyles.input}
                        value={this.state.title}
                        onChangeText={this.handleTitleInput}
                    />
                    <TouchableHighlight 
                        onPress={this.handleSubmit} 
                        style={formStyles.button}
                    >
                        <Text style={formStyles.buttonText}>Submit</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDeck: deck => {
            return dispatch(addDeck(deck));
        },
    };
};

export default connect(null, mapDispatchToProps)(DeckForm);
