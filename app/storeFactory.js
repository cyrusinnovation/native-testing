import { createStore, applyMiddleware} from 'redux';
import reducer from './reducers/reducers'
import thunk from 'redux-thunk'
export default {
  create: (initialState)=> {
    return createStore(reducer, initialState, applyMiddleware(thunk));
  }
};