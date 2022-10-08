import { combineReducers } from 'redux';
import mainReducer from './main-state';
import auxReducer from './aux-state';

const reducers = combineReducers({
  main: mainReducer,
  aux: auxReducer,
});

export default reducers;
