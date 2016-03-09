import ActionTypes from './actionTypes.js';

function changeText(text){
  return {type: ActionTypes.CHANGE_TEXT, text: text};
}

module.exports = {changeText};