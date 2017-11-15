import { Constants } from 'expo';
import propTypes from 'prop-types';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import formStyles from '../styles/forms';
import deckFormStyles from '../styles/deckform';
import React, { Component } from 'react';
import { 
    Button, 
    Keyboard, 
    KeyboardAvoidingView,  
    Text, 
    TextInput, 
    TouchableHighlight, 
    View,
} from 'react-native';

/**
 * @description Deck form component
 */
class DeckForm extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        addDeck: propTypes.func.isRequired,
        navigation: propTypes.object.isRequired,
    };

    /**
     * @description Navigation options
     * @param {object} navigation Navigation object
     */
    static navigationOptions = ({ navigation }) => ({
        title: 'Add deck',
    });

    /**
     * @description Component state
     */
    state = {
        title: '',
        error: null,
    };

    /**
     * @description Saves the title input to component state
     * @param {string} title Title input value
     */
    handleTitleInput = title => {
        this.setState({
            title,
        });
    };

    /**
     * @description Handles submission of the form
     */
    handleSubmit = () => {
        const title = this.state.title.trim();
        
        if (!title) {
            this.setState({
                error: 'Please enter a deck title',
            });

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

    /**
     * @description Renders the component
     */
    render () {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <View style={deckFormStyles.container}>
                    <Text style={formStyles.label}>What is the title of your new deck?</Text>
                    <TextInput
                        style={formStyles.input}
                        value={this.state.title}
                        onChangeText={this.handleTitleInput}
                    />
                    {this.state.error ? (
                        <Text style={formStyles.error}>{this.state.error}</Text>
                    ) : null}
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

/**
 * @description Passes the store dispatch method to component props
 * @param {function} dispatch Dispatch method
 * @returns Component props
 */
const mapDispatchToProps = dispatch => {
    return {
        addDeck: deck => {
            return dispatch(addDeck(deck));
        },
    };
};

export default connect(null, mapDispatchToProps)(DeckForm);
