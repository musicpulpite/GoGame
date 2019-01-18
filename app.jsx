import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './frontend/store/store.js';

import Root from './frontend/components/root.jsx';
import configureBoard from './frontend/configure_board.js';

document.addEventListener('DOMContentLoaded', () => {
  configureBoard();
  const store = configureStore();

  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
});
