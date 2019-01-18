import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './frontend/store/store.js';

import Root from './frontend/components/root.jsx';
import configureBoard from './frontend/configure_board.js';

// testing
import {placePiece} from './frontend/actions/board_actions.js';
//

document.addEventListener('DOMContentLoaded', () => {
  configureBoard();
  // will change to const store after testing
  window.store = configureStore();

  // testing
  window.dispatch = store.dispatch;
  window.placePiece = placePiece;
  //

  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
});
