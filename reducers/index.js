import { ADD_CARD, ADD_DECK, ADD_DECKS, COMPLETE_QUIZ } from '../actions';

function decks (state = {}, action) {
    let decks = state;
    let deck;

    switch (action.type) {
        case ADD_CARD:
            deck = decks.filter(deck => deck.title === action.title).shift();
            deck.questions.push(action.card);

            return decks;
            break;

        case ADD_DECK:
            decks.push(action.deck);

            return decks;
            break;

        case ADD_DECKS:
            return action.decks;
            break;

        case COMPLETE_QUIZ:
            deck = decks.filter(deck => deck.title === action.title).shift();
            deck.timeCompleted = action.timestamp;

            return decks;
            break;
            
        default :
            return state;
            break;
    }
}

export default decks;
