//import { actionTypes } from 'react-redux-form';
//import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        // 
            case ActionTypes.ADD_COMMENTS:
                return {...state, errMess: null, comments: action.payload};
            case ActionTypes.COMMENTS_FAILED:
                return {...state, errMess: action.payload};
            case ActionTypes.ADD_COMMENT:        
            const comment = action.payload;
            // comment.id = state.length;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            // return state.concat(comment);
            return {...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
};