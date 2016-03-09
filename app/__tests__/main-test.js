const {View,Text,TouchableHighlight} = React;
import StoreFactory from '../storeFactory'
import {Provider} from 'react-redux'

import WrappedMain, {Main} from '../main.js';

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