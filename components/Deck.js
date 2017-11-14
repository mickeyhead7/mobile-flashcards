import propTypes from 'prop-types';
import { connect } from 'react-redux';
import deckStyles from '../styles/deck';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';

/**
 * @description Deck component
 */
class Deck extends Component {
    /**
     * @description Proptypes
     */
    static propTypes = {
        deck: propTypes.object.isRequired,
        decks: propTypes.object.isRequired,
        navigation: propTypes.object.isRequired,
    };

    /**
     * @description Navigation options
     * @param {object} navigation Navigation object
     */
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerLeft: (
            <Button onPress={() => navigation.navigate('Decks')} title="Decks" />
        ),
    });

    /**
     * @description Handles navigation to a selcted view
     * @param {string} view Selected view
     */
    navigateTo = view => {
        const { deck, navigation } = this.props;

        navigation.navigate(
            view,
            {
                title: deck.title,
            },
        );
    };

    /**
     * @description Renders the component
     */
    render () {
        const { deck } = this.props;
        const { title, questions = [] } = deck;

        return (
            <View style={{ flex: 1 }}>
                <View style={deckStyles.container}>
                    <Text style={deckStyles.label}>{title}</Text>
                    <Text style={deckStyles.subLabel}>{questions.length} cards</Text>
                    <TouchableHighlight 
                        onPress={() => this.navigateTo('AddCard')}
                        style={[formStyles.buttonHollow, deckStyles.button]}
                    >
                        <Text style={formStyles.buttonTextHollow}>Add card</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        onPress={() => this.navigateTo('Quiz')}
                        style={[formStyles.button, deckStyles.button]}
                    >
                        <Text style={formStyles.buttonText}>Start quiz</Text>
                    </TouchableHighlight>
                </View>
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
        decks,
    };
};

export default connect(mapStateToProps)(Deck);
