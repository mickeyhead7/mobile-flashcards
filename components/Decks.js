import Deck from './Deck';
import Quiz from './Quiz';
import CardForm from './CardForm';
import DeckForm from './DeckForm';
import DeckList from './DeckList';
import propTypes from 'prop-types';
import { View } from 'react-native';
import { addDecks } from '../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

/**
 * @description Navigation component
 */
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

/**
 * @description Decks compeonent
 */
class Decks extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        addDecks: propTypes.func.isRequired,
    };

    /**
     * @description Adds the deks to the store when the component mounts
     */
    componentDidMount () {
        this.props.addDecks();
    }

    /**
     * @description renders the component
     */
    render () {
        return (
            <View style={{flex: 1}}>
                <DecksNavigator />
            </View>
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
        addDecks: () => {
            return dispatch(addDecks());
        },
    };
};

export default connect(null, mapDispatchToProps)(Decks);
