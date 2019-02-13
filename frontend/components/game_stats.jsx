import React from 'react';
import { connect } from 'react-redux';

const GameStats = ({turn, blackCaptured, whiteCaptured}) => {
  return (
    <aside>
      <p>{turn}s turn</p>
      <p>Captured White Pieces: {whiteCaptured}</p>
      <p>Captured Black Pieces: {blackCaptured}</p>
    </aside>
  )
};

const mapStateToProps = (state) => ({
  turn: state.nextPiece,
  blackCaptured: state.gameStats.BLACK,
  whiteCaptured: state.gameStats.WHITE
});

export default connect(
  mapStateToProps,
  null
) (GameStats);
