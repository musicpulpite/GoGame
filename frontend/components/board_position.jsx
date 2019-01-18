import React from 'react';
import { connect } from 'react-redux';

import { placePiece } from '../actions/board_actions.js';

const BoardPosition = ({row, col, board, placePiece}) => {
  const triggerPlacement = () => {
    switch(board.nextPiece === 'BLACK') {
      case true:
        placePiece('BLACK', `${row}${col}`);
        break;
      case false:
        placePiece('WHITE', `${row}${col}`);
        break;
    }
  };

  return (
    <div className={"col " + board[`${row}${col}`].stone}
      id={`${row}${col}`}
      onClick={triggerPlacement}>
    </div>
  )
};

const mapStateToProps = (state) => ({
  board: state.board
});

const mapDispatchToProps = (dispatch) => ({
  placePiece: (stone, pos) => dispatch(placePiece(stone, pos))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPosition);
