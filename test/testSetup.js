import chai from 'chai';
import React from 'react-native';
import {mount} from 'enzyme';
import sinon from 'sinon';

global.expect = chai.expect;
global.React = React;
global.mount = mount;
global.sinon = sinon;