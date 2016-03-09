import React from 'react';

function mockViewComponent (type) {
  const Component = React.createClass({
    displayName: type,
    propTypes: {
      children: React.PropTypes.node
    },
    render() {
      return <div {...this.props}>{this.props.children}</div>;
    }
  });

  return Component;
}


const componentsToMock = [
  'View',
  'Text',
  'WebView',
  'TouchableHighlight',
  'Component',
  'ScrollView',
  'TextInput',
];


const MockDimensions = {
  get(target){
    return {width:100, height:100};
  }
};

const MockNetInfo = {
  fetch(){
    var promise = {done:(func)=>{

    }};
    return promise
  }
};
export const MockComponents = componentsToMock.reduce((agg, type) => {
  agg[type] = mockViewComponent(type);
  return agg;
}, {});


var ReactNative = {
  ...React,
  ...MockComponents,
  StyleSheet: {
    create: (ss) => ss
  },
  Platform:{
    OS: 'ios'
  },
  Dimensions: MockDimensions,
  NetInfo: MockNetInfo,
  PropTypes: React.PropTypes
};

module.exports = ReactNative;

