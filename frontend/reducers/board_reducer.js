import {merge} from 'lodash';

import {PLACE_PIECE} from '../actions/board_actions.js';
import positionData from '../position_data.js';

const preloadedState = {};
const pos = [0,1,2,3,4,5,6,7,8];

pos.forEach((i) => {
  pos.forEach((j) => {
    const pos = `${i}${j}`;
    preloadedState[pos] = new positionData(null, pos);
  })
})

const boardReducer = (state = preloadedState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case PLACE_PIECE:
      // right now we are not checking and preventing suicide moves
      // (or ko violations)

      // set new stone
      const piece = newState[action.pos];
      piece.stone = action.stone;
      piece.groupSize = 1;

      // connect with adjacent stones of same color
      piece.adjacentPositions().forEach((pos) => {
        const otherPiece = newState[pos];

        if (piece.stone === otherPiece.stone &&
            piece.rootPiece() !== otherPiece.rootPiece()) {
          piece.connectPiece(otherPiece);
        }
      });

      // remove liberty from connected pieces of same color
      delete piece.rootPiece().groupLiberties[piece.pos];

      // remove liberty from adjacent empty spaces and opposing color groups
      piece.adjacentPositions().forEach((pos) => {
        const otherPiece = newState[pos];

        if (piece.stone !== otherPiece.stone) {
          delete otherPiece.rootPiece().groupLiberties[piece.pos];
        }
      });


      return newState;

    default:
      return state;
  }
};

export default boardReducer;
