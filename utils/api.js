import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashCards:decks';

/**
 * @description Retrieves decks from local storage
 * @returns {Promise} Decks object listing
 */
export function getDecks () {
    return AsyncStorage
        .getItem(DECKS_STORAGE_KEY)
        .then(results => JSON.parse(results));
}

/**
 * @description Retrieves a selected deck from local storage
 * @returns {Promise} Deck object
 */
export function getDeck (title) {
    return AsyncStorage
        .getItem(DECKS_STORAGE_KEY)
        .then(results => JSON.parse(results)[title]);
}

/**
 * @description Adds a deck to local storage
 * @returns {Promise} Deck object
 */
export function addDeck (title) {
    const deck = {
        title: title,
        questions: [],
        timeCompleted: null,
    };

    return AsyncStorage
        .mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
            [title]: deck,
        }))
        .then(() => {
            return deck;
        });
}

/**
 * @description Adds a card to a deck in local storage
 * @returns {Promise} Card object
 */
export function addCardToDeck (title, card) {
    return getDecks()
        .then(results => {
            const deck = results[title];
            
            deck.questions.push(card);

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: deck,
            }));
        })
        .then(() => card);
}

/**
 * @description Completes a quiz in local storage
 * @returns {Promise} Deck object
 */
export function completeQuiz (title, timestamp) {
    return getDecks()
        .then(results => {
            const deck = results[title];

            deck.timeCompleted = timestamp;

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: deck,
            }));
        })
        .then(() => deck);
}

/**
 * @description Retrieves the most recent completed quiz timestamp from local storage
 * @returns {string} Timestamp of most recent completed quiz
 */
export function getLatestActivity () {
    return getDecks().then(results => {
        return Object.entries(results).reduce((latest, value) => {
            const timestamp = value[1].timeCompleted;

            return (!latest || timestamp > latest) ? timestamp : latest;
        }, null);
    });
}
