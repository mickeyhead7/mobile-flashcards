import { ADD_CARD, ADD_DECK, ADD_DECKS, COMPLETE_QUIZ } from '../actions';

/**
 * @description Store reducers
 * @param {*} state Default state
 * @param {*} action Action to process
 */
function decks (state = {}, action) {
    let decks = state || {};
    let deck;

    switch (action.type) {
        // Adds a new card to a deck
        case ADD_CARD:
            deck = decks[action.title];
            deck.questions.push(action.card);

            return decks;
            break;

        // Adds a new deck
        case ADD_DECK:
            decks[action.deck.title] = action.deck;

            return decks;
            break;

        // Adds decks to the store
        case ADD_DECKS:
            return action.decks;
            break;

        // Completes a quiz
        case COMPLETE_QUIZ:
            deck = decks[action.title];
            deck.timeCompleted = action.timestamp;

            return decks;
            break;
            
        default :
            return state;
            break;
    }
}

export default decks;
