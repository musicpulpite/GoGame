import React from 'react';

import BoardPosition from './board_position.jsx';

const Row = ({row}) => {
  const col = [0,1,2,3,4,5,6,7,8].map(
    (col) => <BoardPosition row={row} col={col} key={col}/>);

  return (
    <div className="row" id={row}>
      {col}
    </div>
  )
};

export default Row;
