/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import Index from './app/index.js'
import React,{Component, AppRegistry} from 'react-native'
class NativeAwesome extends Component {
  render() {
    return (
      <Index/>
    );
  }
}


AppRegistry.registerComponent('NativeAwesome', () => NativeAwesome);
