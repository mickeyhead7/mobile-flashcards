import thunk from 'redux-thunk';
import reducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = compose;
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
