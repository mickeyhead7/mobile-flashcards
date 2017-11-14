import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';

class Card extends Component {
    state = {
        view: 'question',
    };

    setView = view => {
        if (!['question', 'answer'].includes(view)) {
            throw new Error('Invalid card view');
        }

        this.setState({
            view,
        });
    };

    componentWillReceiveProps () {
        this.setState({
            view: 'question',
        });
    }

    render () {
        const { answer, markAsCorrect, markAsIncorrect, question } = this.props;

        return (
            <View>
                <Text>{this.state.view === 'question' ? question : answer}</Text>
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
                <TouchableHighlight
                    style={formStyles.button}
                    onPress={markAsCorrect}
                >
                    <Text style={formStyles.buttonText}>Correct</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={formStyles.button}
                    onPress={markAsIncorrect}
                >
                    <Text style={formStyles.buttonText}>Incorrect</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Card;
