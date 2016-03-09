import actions from '../actions';
import ActionTypes from '../actionTypes';

describe('Actions View', ()=> {
  describe('changeText', ()=> {
    it('Returns the correct payload', ()=> {
      var newText = 'Here is the next text';
      var payload = actions.changeText(newText);
      expect(payload).to.eql({type: ActionTypes.CHANGE_TEXT, text: newText});
    });
  })
});
