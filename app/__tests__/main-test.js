const {View,Text,TouchableHighlight} = React;
import StoreFactory from '../storeFactory'
import {Provider} from 'react-redux'
import ActionTypes from '../actions/actionTypes'
import Actions from '../actions/actions'
import WrappedMain, {Main} from '../main.js';

describe('Wrapped Main View', ()=> {
  var stateText,
    main, store;

  beforeEach(()=> {
    stateText = 'Wrapper text';
    store = StoreFactory.create();
    sinon.stub(store, 'getState').returns({text: stateText});
    sinon.stub(store, 'dispatch');

    sinon.spy(Actions, 'getAPIText');
    var mainWrapper = mount(<Provider store={store}><WrappedMain/></Provider>);
    main = mainWrapper.find(Main);
  });

  afterEach(()=> {
    Actions.getAPIText.restore();
    store.getState.restore();
    store.dispatch.restore();
  });

  it('It translates correct store state to properties', ()=> {
    expect(main.prop('text')).to.eql(stateText);
  });

  it('It provides changeText property which dispatches change text action', ()=> {
    var changeTextFunc = main.prop('changeText');

    changeTextFunc('Greetings');
    var dispatch = store.dispatch.lastCall.args[0];
    expect(dispatch.type).to.equal(ActionTypes.CHANGE_TEXT);
    expect(dispatch.text).to.equal('Greetings');

    changeTextFunc('Hello Text');
    var dispatch = store.dispatch.lastCall.args[0];
    expect(dispatch.type).to.equal(ActionTypes.CHANGE_TEXT);
    expect(dispatch.text).to.equal('Hello Text');
  });

  it('It provides getAPIText property which dispatches getAPIText action', ()=> {
    var getAPITextFunction = main.prop('getAPIText');

    getAPITextFunction();
    var dispatch = store.dispatch.lastCall;
    //dispatch.args[0]();
    expect(Actions.getAPIText.called).to.equal(true);
  });
});

describe('Main View', function () {
  describe('Layout', ()=> {
    var main,
      textValue;

    before(()=> {
      textValue = 'here is the text';
      main = mount(<Main text={textValue} changeText={()=>{}} getAPIText={()=>{}}/>);
    });

    it('Has a view with some text', ()=> {
      var view = main.find(View);
      var text = view.find(Text).first();
      expect(text.text()).to.equal(textValue);
    });

    it('Has a push me button', ()=> {
      var view = main.find(View);
      var button = view.find(TouchableHighlight).at(0);
      var buttonText = button.find(Text);
      expect(buttonText.text()).to.equal('Push Me');
    });

    it('Has a Get Text From server button', ()=> {
      var view = main.find(View);
      var button = view.find(TouchableHighlight).at(1);
      var buttonText = button.find(Text);
      expect(buttonText.text()).to.equal('Get Text from server');
    });
  });

  describe('Interaction', () => {
    it('Fires changeText property on button press sends Hello React to changeText method', ()=> {
      var changeTextSpy = sinon.spy();
      var text = '';
      var main = mount(<Main text={text} changeText={changeTextSpy} getAPIText={()=>{}}/>);
      var button = main.find(TouchableHighlight).at(0);

      button.prop('onPress')();
      expect(changeTextSpy.called).to.equal(true);
      expect(changeTextSpy.lastCall.args).to.eql(['Hello React']);
    });

    it('Fires changeText property on button press sends Goodbye React to changeText method if text prop is Hello React', ()=> {
      var changeTextSpy = sinon.spy();
      var text = 'Hello React';
      var main = mount(<Main text={text} changeText={changeTextSpy} getAPIText={()=>{}}/>);
      var button = main.find(TouchableHighlight).at(0);

      button.prop('onPress')();
      expect(changeTextSpy.called).to.equal(true);
      expect(changeTextSpy.lastCall.args).to.eql(['Goodbye React']);
    });

    it('Fires getAPIText property on button pressed', ()=> {
      var apiTextSpy = sinon.spy();
      var main = mount(<Main text={''} changeText={()=>{}} getAPIText={apiTextSpy}/>);
      var button = main.find(TouchableHighlight).at(1);

      button.prop('onPress')();
      expect(apiTextSpy.called).to.equal(true);
    });
  });
});