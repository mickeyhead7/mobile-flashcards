import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashCards:decks';

export function getDecks () {
    // AsyncStorage
    //     .setItem(DECKS_STORAGE_KEY, JSON.stringify({}));

    return AsyncStorage
        .getItem(DECKS_STORAGE_KEY)
        .then(results => JSON.parse(results));
}

export function getDeck (title) {
    return AsyncStorage
        .getItem(DECKS_STORAGE_KEY)
        .then(results => JSON.parse(results)[title]);
}

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

export function addCardToDeck (title, card) {
    return getDecks()
        .then(results => {
            const deck = results[title];
            
            deck.questions.push(card);

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: deck,
            }));
        });
}

export function completeQuiz (title, timestamp) {
    return getDecks()
        .then(results => {
            const deck = results[title];

            deck.timeCompleted = timestamp;

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]: deck,
            }));
        });
}

export function getLatestActivity () {
    return getDecks().then(results => {
        return Object.entries(results).reduce((latest, value) => {
            const timestamp = value[1].timeCompleted;

            return (!latest || timestamp > latest) ? timestamp : latest;
        }, null);
    });
}
