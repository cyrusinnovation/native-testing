import ActionTypes from './actionTypes.js';

function changeText(text) {
  return {type: ActionTypes.CHANGE_TEXT, text: text};
}
function getAPIText() {
  return ((dispatch)=> {
    return fetch('http://localhost:3000/')
      .then((response)=> {
        return response.json();
      }).then((json)=> {
        dispatch(gotAPIText(json));
      });
  })
}

function gotAPIText(response) {

  return {type: ActionTypes.GOT_API_TEXT, response: response}
}

module.exports = {changeText, getAPIText, gotAPIText};