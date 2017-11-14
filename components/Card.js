import propTypes from 'prop-types';
import quizStyles from '../styles/quiz';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';

/**
 * @description Card component
 */
class Card extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        answer: propTypes.string.isRequired, 
        markAsCorrect: propTypes.func.isRequired, 
        markAsIncorrect: propTypes.func.isRequired, 
        question: propTypes.string.isRequired,
    };

    /**
     * @description Component state
     */
    state = {
        view: 'question',
    };

    /**
     * @description Switches the card view between question and answer
     * @param {string} view View type
     */
    setView = view => {
        if (!['question', 'answer'].includes(view)) {
            throw new Error('Invalid card view');
        }

        this.setState({
            view,
        });
    };

    /**
     * @description Resets the view to display a question
     */
    componentWillReceiveProps () {
        this.setView('question');
    }

    /**
     * @description Renders the component
     * @returns Component output
     */
    render () {
        const { answer, markAsCorrect, markAsIncorrect, question } = this.props;

        return (
            <View>
                <Text style={quizStyles.question}>
                    {this.state.view === 'question' ? question : answer}
                </Text>
                <View style={quizStyles.toggle}>
                    {this.state.view === 'question' ? (
                        <Button 
                            onPress={() => this.setView('answer')} 
                            title="Show answer"
                        />
                    ) : (
                        <Button 
                            onPress={() => this.setView('question')}
                            title="Show question"
                        />
                    )}
                </View>
                <TouchableHighlight
                    style={[formStyles.button, quizStyles.buttonCorrect]}
                    onPress={markAsCorrect}
                >
                    <Text style={formStyles.buttonText}>Correct</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[formStyles.button, quizStyles.buttonIncorrect]}
                    onPress={markAsIncorrect}
                >
                    <Text style={formStyles.buttonText}>Incorrect</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Card;
