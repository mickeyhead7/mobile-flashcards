import Card from './Card';
import propTypes from 'prop-types';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import quizStyles from '../styles/quiz';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { completeQuiz } from '../actions';
import { Text, TouchableHighlight, View } from 'react-native';

/**
 * @description Quiz component
 */
class Quiz extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        deck: propTypes.object.isRequired,
        completeQuiz: propTypes.func.isRequired,
        navigation: propTypes.object.isRequired,
    };

    /**
     * @description Navigation options
     * @param {object} navigation Navigation object
     */
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });

    /**
     * @description Component state
     */
    state = {
        key: 0,
        score: 0,
    };

    /**
     * @description marks a question as correct
     */
    markAsCorrect = () => {
        this.setState(currentState => {
            return {
                score: currentState.score += 1,
                key: currentState.key += 1,
            };
        }, () => {
            if (this.isQuizComplete()) {
                this.completeQuiz();
            }
        });
    };

    /**
     * @description marks a question as incorrect
     */
    markAsIncorrect = () => {
        this.setState(currentState => {
            return {
                key: currentState.key += 1,
            };
        }, () => {
            if (this.isQuizComplete()) {
                this.completeQuiz();
            }
        });
    };

    /**
     * @description Checks if the quiz is complete
     * @returns {boolean} Truthy value
     */
    isQuizComplete = () => {
        const { questions = [] } = this.props.deck;

        return this.state.key >= questions.length;
    };

    /**
     * @description Completes the quiz
     * @returns {Promise} Complete quiz action
     */
    completeQuiz = () => {
        return this.props.completeQuiz(this.props.deck.title, new Date());
    };

    /**
     * @description Determines the message to render upon quiz completion
     * @returns {string} Message string
     */
    completionMessage = () => {
        const { questions = [] } = this.props.deck;
        const percentage = this.state.score / questions.length;

        if (percentage < .25) {
            return "Better luck next time";
        } else if (percentage < .5) {
            return "Not bad";
        } else {
            return "Well done :)";
        }
    };

    /**
     * @description Navigates to the decks view
     */
    toDecks = () => {
        this.props.navigation.navigate('Decks');
    };

    /**
     * @description Renders the component
     */
    render () {
        const { questions = [] } = this.props.deck;
        const card = questions[this.state.key];

        return (
            <View style={{ flex: 1 }}>
                {card && !this.isQuizComplete() ? (
                    <View style={quizStyles.container}>
                        <Text style={quizStyles.count}>
                            {`Question ${this.state.key + 1} of ${questions.length}`}
                        </Text>
                        <Card 
                            {...card} 
                            markAsCorrect={this.markAsCorrect}
                            markAsIncorrect={this.markAsIncorrect}
                        />
                    </View>
                ) : (
                    <View style={quizStyles.container}>
                        <Text style={quizStyles.message}>
                            {this.completionMessage()}
                        </Text>
                        <Text style={quizStyles.label}>
                            {`You scored ${this.state.score} out of ${questions.length}`}
                        </Text>
                        <TouchableHighlight
                            style={formStyles.buttonHollow}
                            onPress={this.toDecks}
                        >
                            <Text style={formStyles.buttonTextHollow}>Try another quiz</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </View>
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
    };
};

/**
 * @description Passes the store dispatch method to component props
 * @param {function} dispatch Dispatch method
 * @returns Component props
 */
const mapDispatchToProps = dispatch => {
    return {
        completeQuiz: (title, timestamp) => {
            return dispatch(completeQuiz(title, timestamp));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
