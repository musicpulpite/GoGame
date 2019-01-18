import {merge} from 'lodash';

import {PLACE_PIECE} from '../actions/board_actions.js';

const preloadedData = {
  nextPiece: 'BLACK',
  ko: null
}
const gameReducer = (state = preloadedData, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch(action.type) {
    case PLACE_PIECE:
      return newState;

    default:
      return state;
  }
};

export default gameReducer;
