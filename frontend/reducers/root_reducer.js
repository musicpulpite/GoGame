import {combineReducers} from 'redux';

import boardReducer from './board_reducer.js';
import gameReducer from './game_reducer.js';

const RootReducer = combineReducers({
  board: boardReducer
});

export default RootReducer;
