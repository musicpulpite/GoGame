import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import RootReducer from '../reducers/root_reducer';

// const preloadedState = {board: {}, ko: null};
// const pos = [0,1,2,3,4,5,6,7,8];
//
// pos.forEach((i) => {
//   pos.forEach((j) => {
//     const positionData = {
//       piece: null,
//       parentPiece: this,
//       // groupLiberties: {},
//       groupSize: 0
//     };
//
//     // if (i > 0) positionData.groupLiberties[`${i - 1}${j}`] = true;
//     // if (i < 8) positionData.groupLiberties[`${i + 1}${j}`] = true;
//     // if (j > 0) positionData.groupLiberties[`${i}${j - 1}`] = true;
//     // if (j < 8) positionData.groupLiberties[`${i}${j + 1}`] = true;
//
//     preloadedState.board[`${i}${j}`] = positionData;
//   })
// })

const configureStore = (preloadedState = {}) => (
  createStore(RootReducer, preloadedState, applyMiddleware(logger))
);

export default configureStore;
