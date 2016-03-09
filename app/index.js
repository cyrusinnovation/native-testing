/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import  React,{ Component } from 'react-native'
import { Provider } from 'react-redux'
import StoreFactory from './storeFactory.js'
import Main from './main'


class Index extends Component {

  constructor(props) {
    super(props);
    this.store = StoreFactory.create({text: 'Greetings'});

  }

  render() {
    return (
      <Provider store={this.store}>
        <Main/>
      </Provider>
    );
  }
}

export default Index;