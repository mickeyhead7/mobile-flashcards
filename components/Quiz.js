import Card from './Card';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { completeQuiz } from '../actions';
import { Text, View } from 'react-native';

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
    });

    state = {
        key: 0,
        score: 0,
    };

    getCurrentTimestamp = () => {
        return Math.floor(Date.now() / 1000);
    };

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

    isQuizComplete = () => {
        const { questions = [] } = this.props.deck;

        return this.state.key >= questions.length;
    };

    completeQuiz = () => {
        return this.props.completeQuiz(this.props.deck.title);
    };

    render () {
        const { questions = [] } = this.props.deck;
        const card = questions[this.state.key];

        return (
            <View style={{ flex: 1 }}>
                {card && !this.isQuizComplete() ? (
                    <Card 
                        {...card} 
                        markAsCorrect={this.markAsCorrect}
                        markAsIncorrect={this.markAsIncorrect}
                    />
                ) : (
                    <View>
                        <Text>{`You scored ${this.state.score} out of ${questions.length}`}</Text>
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = (decks, { navigation }) => {
    const { title } = navigation.state.params;
    const deck = decks.filter(deck => deck.title === title).shift();

    return {
        deck,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        completeQuiz: (title) => {
            return dispatch(completeQuiz(title));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
