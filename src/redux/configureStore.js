import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// import { Reducer, initialState } from './reducer';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {

    //combined Reducer replaces Reducer.js file
    const store = createStore(
        // Reducer,
        // initialState
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            // below is meant to be used with combineReducer
            ...createForms({
                feedbackForm: InitialFeedback
            })

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}