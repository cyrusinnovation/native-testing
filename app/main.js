/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import { connect } from 'react-redux'
import {changeText} from './actions/actions'
import React,
  {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
  } from 'react-native'

export class Main extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
        <TouchableHighlight onPress={this.props.onClick}><Text>Push Me</Text></TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



const mapStateToProps = (state) => {
  return {
    text: state.text
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(changeText('Hello Text'));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Main);