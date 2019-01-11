import configureStore from './frontend/store/store.js';

import {placePiece} from './frontend/actions/board_actions.js';

document.addEventListener('DOMContentLoaded', () => {
  window.store = configureStore();

  window.dispatch = store.dispatch;
  window.placePiece = placePiece;
});
