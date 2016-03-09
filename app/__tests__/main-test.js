const {View,Text,TouchableHighlight} = React;
import StoreFactory from '../storeFactory'
import {Provider} from 'react-redux'
import ActionTypes from '../actions/actionTypes'
import WrappedMain, {Main} from '../main.js';

describe('Wrapped Main View', ()=> {
  var stateText,
    main, store;

  beforeEach(()=> {
    stateText = 'Wrapper text';
    store = StoreFactory.create();
    sinon.stub(store, 'getState').returns({text: stateText});
    sinon.spy(store, 'dispatch');
    var mainWrapper = mount(<Provider store={store}><WrappedMain/></Provider>);
    main = mainWrapper.find(Main);
  });

  afterEach(()=> {
    store.getState.restore();
    store.dispatch.restore();
  });
  it('It translates correct store state to properties', ()=> {
    expect(main.prop('text')).to.eql(stateText);
  });

  it('It provides onClick property which dispatches change text action', ()=> {
    main.prop('onClick')();
    var dispatch = store.dispatch.lastCall.args[0];
    expect(dispatch.type).to.equal(ActionTypes.CHANGE_TEXT);
    expect(dispatch.text).to.equal('Hello Text');

  });
});

describe('Main View', function () {
  describe('Layout', ()=> {
    var main,
      textValue;

    before(()=> {
      textValue = 'here is the text';
      main = mount(<Main text={textValue}/>);
    });

    it('Has a view with some text', ()=> {
      var view = main.find(View);
      var text = view.find(Text).first();
      expect(text.text()).to.equal(textValue);
    });

    it('Has a button', ()=> {
      var view = main.find(View);
      var button = view.find(TouchableHighlight);
      var buttonText = button.find(Text);
      expect(buttonText.text()).to.equal('Push Me');
    });
  });

  describe('Interaction', () => {
    it('Fires on click property on button press', ()=> {
      var onClick = sinon.spy();
      var main = mount(<Main onClick={onClick}/>);
      var button = main.find(TouchableHighlight);

      button.prop('onPress')();
      expect(onClick.called).to.equal(true);
    });
  });
});