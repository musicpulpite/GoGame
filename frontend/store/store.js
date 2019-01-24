import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import gameReducer from '../reducers/game_reducer.js';
import positionData from '../position_data.js';

const defaultInitialState = {};
const indices = [0,1,2,3,4,5,6,7,8];

defaultInitialState.board = {};

indices.forEach((i) => {
  indices.forEach((j) => {
    const pos = `${i}${j}`;
    defaultInitialState.board[pos] = new positionData(null, pos);
  });
});

defaultInitialState.nextPiece = 'BLACK';
defaultInitialState.prevBoard = null;

const configureStore = (preloadedState = defaultInitialState) => (
  createStore(gameReducer, preloadedState, applyMiddleware(logger))
);

export default configureStore;
