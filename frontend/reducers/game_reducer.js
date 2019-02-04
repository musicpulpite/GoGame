import { merge, cloneDeep } from 'lodash';

import { violatesKo } from './util_functions.js';
import { PLACE_PIECE } from '../actions/board_actions.js';
import positionData from '../position_data.js';

const gameReducer = (state, action) => {
  Object.freeze(state);
  let newState = cloneDeep(state);

  switch(action.type) {
    case PLACE_PIECE:
      // select board position
      const piece = newState.board[action.pos];

      // prevent placing piece on occupied position
      if (piece.stone) return state;

      // assuming valid move (will check at end), set new stone
      piece.stone = action.stone;
      piece.groupSize = 1;

      // connect with adjacent stones of same color
      piece.adjacentPositions().forEach((pos) => {
        const otherPiece = newState.board[pos];

        if (piece.stone === otherPiece.stone &&
            piece.rootPiece() !== otherPiece.rootPiece()) {
          piece.connectPiece(otherPiece);
        }
      });

      // remove liberty from connected pieces of same color
      piece.removeLibertyfromGroupRoot(piece.pos);
      // delete piece.rootPiece().groupLiberties[piece.pos];

      // remove liberty from adjacent empty spaces and opposing color groups
      piece.adjacentPositions().forEach((pos) => {
        const otherPiece = newState.board[pos];

        if (piece.stone !== otherPiece.stone) {
          otherPiece.removeLibertyfromGroupRoot(piece.pos);
          // delete otherPiece.rootPiece().groupLiberties[piece.pos];
        }
      });

      // eliminate any opposing pieces if all liberties taken
      piece.adjacentPositions().forEach((pos) => {
        const otherPiece = newState.board[pos];

        if (otherPiece.stone &&
            piece.stone !== otherPiece.stone) {
              positionData.removeGroupfromRoot(
                newState.board,
                newState.gameStats,
                otherPiece.rootPiece()
              );
            }
      });
      //

      // cancel and return original state if suicide move
      let newGroupLiberties = piece.rootPiece().groupLiberties;
      if (Object.keys(newGroupLiberties).length === 0) return state;

      // cancel and return original state if move violates ko rule
      if (violatesKo(state.prevBoard, newState.board)) return state;

      else {
        newState.prevBoard = state.board;
        newState.nextPiece = (newState.nextPiece === 'BLACK' ? 'WHITE' : 'BLACK');
        return newState;
        break;
      }


    default:
      return state;
  }
};

export default gameReducer;
