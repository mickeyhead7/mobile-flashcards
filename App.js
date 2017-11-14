import React from 'react';
import store from './store';
import * as API from './utils/api';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Decks from './components/Decks';
import DeckForm from './components/DeckForm';
import { clearActivityReminderNotification, setActivityReminderNotification } from './utils/notifications';

/**
 * @description App component
 */
export default class App extends React.Component {
    /**
     * @description Sets a local notification upon  mount
     */
    componentDidMount () {
        API.getLatestActivity().then(timestamp => {
            const now = new Date();
            const latest = new Date(timestamp);
            
            now.setDate(now.getDate() - 1);

            if (now.getTime() > latest.getTime()) {
                setActivityReminderNotification();
            } else {
                clearActivityReminderNotification();
            }
        });
    }
  
    /**
     * @description renders the app
     */
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Decks />
                </View>
            </Provider>
        );
    }
}
