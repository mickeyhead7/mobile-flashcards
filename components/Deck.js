import { connect } from 'react-redux';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

class Deck extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });

    navigateTo = view => {
        const { deck, navigation } = this.props;

        
        navigation.navigate(
            view,
            {
                title: deck.title,
            },
        );
    };

    render () {
        const { deck } = this.props;
        const { title, questions = [] } = deck;

        return (
            <View style={{ flex: 1 }}>
                <Text>{title}</Text>
                <Text>{questions.length} cards</Text>
                <TouchableHighlight 
                    onPress={() => this.navigateTo('AddCard')}
                    style={formStyles.button}
                >
                    <Text style={formStyles.buttonText}>Add card</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress={() => this.navigateTo('Quiz')}
                    style={formStyles.button}
                >
                    <Text style={formStyles.buttonText}>Start quiz</Text>
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

export default connect(mapStateToProps)(Deck);
