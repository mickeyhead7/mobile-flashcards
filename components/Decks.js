import Deck from './Deck';
import Quiz from './Quiz';
import CardForm from './CardForm';
import DeckForm from './DeckForm';
import DeckList from './DeckList';
import { View } from 'react-native';
import { addDecks } from '../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

const DecksNavigator = StackNavigator({
    Decks: {
        screen: DeckList,
    },
    Deck: {
        screen: Deck,
    },
    DeckForm: {
        screen: DeckForm,
    },
    AddCard: {
        screen: CardForm,
    },
    Quiz: {
        screen: Quiz,
    },
});

class Decks extends Component {
    componentDidMount () {
        this.props.addDecks();
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <DecksNavigator />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDecks: () => {
            return dispatch(addDecks());
        },
    };
};

export default connect(null, mapDispatchToProps)(Decks);
