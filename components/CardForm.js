import * as API from '../utils/api';
import { connect } from 'react-redux';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { addCardToDeck } from '../actions';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';

class CardForm extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add card',
    });

    state = {
        question: '',
        answer: '',
    };

    handleQuestionInput = question => {
        this.setState({
            question,
        });
    };

    handleAnswerInput = answer => {
        this.setState({
            answer,
        });
    };

    handleSubmit = () => {
        const { title } = this.props.deck;
        const question = this.state.question.trim();
        const answer = this.state.answer.trim();
        const card = {
            question,
            answer,
        };
        
        if (!question || !answer) {
            return;
        }

        this.props.addCardToDeck(title, card)
            .then(() => {
                const { deck, navigation } = this.props;

                navigation.goBack();
            });
    };

    render () {
        return (
            <View style={{ flex: 1 }}>
                <Text>Question</Text>
                <TextInput
                    style={formStyles.input}
                    value={this.state.question}
                    onChangeText={this.handleQuestionInput}
                />
                <Text>Answer</Text>
                <TextInput
                    style={formStyles.input}
                    value={this.state.answer}
                    onChangeText={this.handleAnswerInput}
                />
                <TouchableHighlight 
                    onPress={this.handleSubmit} 
                    style={formStyles.button}
                >
                    <Text style={formStyles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (decks, { navigation }) => {
    const { title } = navigation.state.params;
    const deck = decks.filter(deck => deck.title === title).shift();

    return {
        deck,
        decks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCardToDeck: (title, card) => {
            return dispatch(addCardToDeck(title, card));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
