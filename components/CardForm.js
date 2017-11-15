import propTypes from 'prop-types';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { addCardToDeck } from '../actions';
import cardFormStyles from '../styles/cardform';
import { KeyboardAvoidingView, Text, TextInput, TouchableHighlight, View } from 'react-native';

/**
 * @description Card form component
 */
class CardForm extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        addCardToDeck: propTypes.func.isRequired,
        deck: propTypes.object.isRequired,
        decks: propTypes.object.isRequired,
        navigation: propTypes.object.isRequired,
    };

    /**
     * @description Navigation options
     * @param {object} navigation Navigation object
     */
    static navigationOptions = ({ navigation }) => ({
        title: 'Add card',
    });

    /**
     * @description Component state
     */
    state = {
        question: '',
        answer: '',
        error: null,
    };

    /**
     * @description Saves the question input to the state
     * @param {string} question Input value
     */
    handleQuestionInput = question => {
        this.setState({
            question,
        });
    };

    /**
     * @description Saves the answer input to the state
     * @param {string} answer Input value
     */
    handleAnswerInput = answer => {
        this.setState({
            answer,
        });
    };

    /**
     * @description Handles the submission of the new card
     */
    handleSubmit = () => {
        const { title } = this.props.deck;
        const question = this.state.question.trim();
        const answer = this.state.answer.trim();
        const card = {
            question,
            answer,
        };
        
        if (!question || !answer) {
            this.setState({
                error: 'Please enter a question and an answer',
            });

            return;
        }

        this.props.addCardToDeck(title, card)
            .then(() => {
                const { deck, navigation } = this.props;

                navigation.navigate('Deck', {
                    title,
                });
            });
    };

    /**
     * @description Renders the component
     * @returns Component output
     */
    render () {
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <View style={cardFormStyles.container}>
                    <Text style={formStyles.label}>Question</Text>
                    <TextInput
                        style={formStyles.input}
                        value={this.state.question}
                        onChangeText={this.handleQuestionInput}
                    />
                    <Text style={formStyles.label}>Answer</Text>
                    <TextInput
                        style={formStyles.input}
                        value={this.state.answer}
                        onChangeText={this.handleAnswerInput}
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
 * @description Maps the store state to component properties
 * @param {object} decks Decks object
 * @param {object} navigation Navigtion object
 * @returns {object} Props to map
 */
const mapStateToProps = (decks, { navigation }) => {
    const { title } = navigation.state.params;
    const deck = decks[title];

    return {
        deck,
        decks,
    };
};

/**
 * @description Passes the store dispatch method to component props
 * @param {function} dispatch Dispatch method
 * @returns Component props
 */
const mapDispatchToProps = dispatch => {
    return {
        addCardToDeck: (title, card) => {
            return dispatch(addCardToDeck(title, card));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
