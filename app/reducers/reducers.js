import {combineReducers} from 'redux';
import ActionTypes from '../actions/actionTypes.js';

function text(state = 'Hello Tests', action = {type: 'NONE'}) {
  switch (action.type) {
    case ActionTypes.CHANGE_TEXT:
      return action.text;
    case ActionTypes.GOT_API_TEXT:
      return action.response.text;
    default:
      return state
  }
}

export default combineReducers({
  text
});