import { connect } from 'react-redux';
import deckStyles from '../styles/decks';
import formStyles from '../styles/forms';
import React, { Component } from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';

class DeckList extends Component {
    static navigationOptions = {
        title: 'Decks',
    };

    navigateToDeck = title => {
        this.props.navigation.navigate(
            'Deck',
            {
                title,
            }
        );
    };

    toDeckForm = () => {
        this.props.navigation.navigate('DeckForm');
    };
    
    render () {
        return (
            <View style={{ flex: 1 }}>
                <TouchableHighlight 
                    onPress={this.toDeckForm} 
                    style={formStyles.button}
                >
                    <Text style={formStyles.buttonText}>Add a new deck</Text>
                </TouchableHighlight>
                <FlatList
                    data={this.props.decks}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => this.navigateToDeck(item.title)}>
                            <View style={deckStyles.card}>
                                <Text>
                                    {item.title}
                                </Text>
                                <Text>
                                    {item.questions.length} cards
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = decks => {
    return {
        decks,
    };
};

export default connect(mapStateToProps)(DeckList);
