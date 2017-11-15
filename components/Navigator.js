import Deck from './Deck';
import Quiz from './Quiz';
import CardForm from './CardForm';
import DeckForm from './DeckForm';
import DeckList from './DeckList';
import { StackNavigator } from 'react-navigation';

/**
 * @description Navigation component
 */
Navigator = StackNavigator({
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

export default Navigator;
