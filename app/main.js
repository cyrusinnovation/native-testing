/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {changeText, getAPIText} from './actions/actions';
import React,
  {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  PropTypes
  } from 'react-native';

export class Main extends Component {
  constructor(props) {
    super(props);
    this._updateText = this.__updateText.bind(this);
  }

  __updateText() {
    if (this.props.text === 'Hello React') {
      this.props.changeText('Goodbye React');
    }
    else {
      this.props.changeText('Hello React');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
        <TouchableHighlight onPress={this._updateText}><Text>Push Me</Text></TouchableHighlight>
        <TouchableHighlight onPress={this.props.getAPIText}><Text>Get Text from server</Text></TouchableHighlight>
      </View>
    );
  }
}
Main.propTypes = {
  text: PropTypes.string.isRequired,
  changeText: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});


const mapStateToProps = (state) => {
  return {
    text: state.text
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changeText, getAPIText}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);