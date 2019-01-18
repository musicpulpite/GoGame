import {combineReducers} from 'redux';

import boardReducer from './board_reducer.js';
import koReducer from './ko_reducer.js';

const RootReducer = combineReducers({
  board: boardReducer,
  ko: koReducer
});

export default RootReducer;
