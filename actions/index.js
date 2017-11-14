import sortBy from 'sort-by';
import * as API from '../utils/api';

export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const ADD_DECKS = 'ADD_DECKS';
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

export const addCardToDeck = (title, card) => dispatch => {
    return API.addCardToDeck(title, card)
        .then(() => {
            return dispatch(addCardToDeckStore(title, card));
        });
};

const addCardToDeckStore = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card,
    };
};

export const addDeck = title => dispatch => {
    return API.addDeck(title)
        .then(deck => dispatch(addDeckToStore(deck)));
};

export const addDecks = () => dispatch => {
    return API.getDecks()
        .then(results => {
            const sorted = Object.entries(results).sort(sortBy('1.title'));

            return sorted.map(deck => deck[1]);
        })
        .then(decks => dispatch(addDecksToStore(decks)));
};

const addDeckToStore = deck => {
    return {
        type: ADD_DECK,
        deck,
    };
};

const addDecksToStore = decks => {
    return {
        type: ADD_DECKS,
        decks,
    };
};

export const completeQuiz = (title, timestamp) => dispatch => {
    return API.completeQuiz(title, timestamp)
        .then(dispatch(completeQuizInStore(title, timestamp)));
};

const completeQuizInStore = (title, timestamp) => {
    return {
        type: COMPLETE_QUIZ,
        title,
        timestamp,
    };
};
