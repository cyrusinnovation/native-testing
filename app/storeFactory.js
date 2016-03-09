import { createStore } from 'redux';
import reducer from './reducers/reducers'

export default {
  create: (initialState)=> {
    return createStore(reducer, initialState);
  }
};