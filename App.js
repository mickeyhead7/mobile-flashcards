import React from 'react';
import store from './store';
import * as API from './utils/api';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Decks from './components/Decks';
import DeckForm from './components/DeckForm';
import { clearActivityReminderNotification, setActivityReminderNotification } from './utils/notifications';

export default class App extends React.Component {
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
