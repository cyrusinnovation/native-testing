import reducer from '../reducers';
import ActionTypes from '../../actions/actionTypes'

describe('Application reducer', ()=> {
  it('Returns initial state without an action', ()=> {
    var state = reducer();
    expect(state).to.eql({text: 'Hello Tests'});
  });

  it('Will set the text when the action type is CHANGE_TEXt',()=>{
    var newText = 'Hello new text';
    var action = {type: ActionTypes.CHANGE_TEXT, text: newText};
    var newState = reducer({text: 'HelloText'}, action);
    expect(newState).to.eql({text: newText});
  });
});