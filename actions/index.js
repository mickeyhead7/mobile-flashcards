import * as API from '../utils/api';

/**
 * @constant {string} ADD_CARD Add card value
 */
export const ADD_CARD = 'ADD_CARD';

/**
 * @constant {string} ADD_DECK Add deck value
 */
export const ADD_DECK = 'ADD_DECK';

/**
 * @constant {string} ADD_DECKS Add decks value
 */
export const ADD_DECKS = 'ADD_DECKS';

/**
 * @constant {string} COMPLETE_QUIZ Complete quiz value
 */
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

/**
 * @description Adds a card via the API
 * @param {string} title Deck title
 * @param {object} card Card object
 * @returns {Promise} API save result
 */
export const addCardToDeck = (title, card) => dispatch => {
    return API.addCardToDeck(title, card)
        .then(() => {
            return dispatch(addCardToDeckStore(title, card));
        });
};

/**
 * @description Adds a card to a deck
 * @param {string} title Deck title
 * @param {object} card Card object
 * @returns {object} Action object
 */
const addCardToDeckStore = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card,
    };
};

/**
 * @description Adds a deck via the API
 * @param {string} title Title of the new deck
 * @returns {Promise} API result
 */
export const addDeck = title => dispatch => {
    return API.addDeck(title)
        .then(deck => dispatch(addDeckToStore(deck)));
};

/**
 * @description Adds decks via the API
 * @returns {object} API result
 */
export const addDecks = () => dispatch => {
    return API.getDecks()
        .then(decks => dispatch(addDecksToStore(decks)));
};

/**
 * @description Adds a deck to the store
 * @param {object} deck Deck object
 * @returns {object} Action object
 */
const addDeckToStore = deck => {
    return {
        type: ADD_DECK,
        deck,
    };
};

/**
 * @description Adds decks to the store
 * @param {object} decks Decks object
 * @returns {object} Action object
 */
const addDecksToStore = decks => {
    return {
        type: ADD_DECKS,
        decks,
    };
};

/**
 * @description Completes a quiz via the API
 * @param {string} title Deck title
 * @param {string} timestamp Quiz completed timestamp
 */
export const completeQuiz = (title, timestamp) => dispatch => {
    return API.completeQuiz(title, timestamp)
        .then(dispatch(completeQuizInStore(title, timestamp)));
};

/**
 * @description Marks a quiz as complete in the store
 * @param {string} title Deck title
 * @param {string} timestamp Quiz completed timestamp
 */
const completeQuizInStore = (title, timestamp) => {
    return {
        type: COMPLETE_QUIZ,
        title,
        timestamp,
    };
};
