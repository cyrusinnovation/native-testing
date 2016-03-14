import actions from '../actions';
import ActionTypes from '../actionTypes';
import FetchMock from 'fetch-mock';
describe('Actions', ()=> {
  describe('changeText', ()=> {
    it('Returns the correct payload', ()=> {
      var newText = 'Here is the next text';
      var payload = actions.changeText(newText);
      expect(payload).to.eql({type: ActionTypes.CHANGE_TEXT, text: newText});
    });
  });

  describe('gotAPIText', ()=> {
    it('Returns the correct payload', ()=> {
      var response = {response: 'stuff'};
      var payload = actions.gotAPIText(response);
      expect(payload).to.eql({type: ActionTypes.GOT_API_TEXT, response: response});
    });
  });

  describe('getAPIText', ()=> {
    it('Calls fetch to the api, and dispatches got APIText on success', (done)=> {

      var spy = sinon.spy();
      var responseJson = {text: 'sometext'};
      FetchMock.mock('http://localhost:3000/', responseJson);

      actions.getAPIText()(spy).then(()=>{
        expect(FetchMock.called('http://localhost:3000/')).to.equal(true);
        expect(spy.calledWith(responseJson));
        FetchMock.restore();
        done();
      });

    });
  });
});
