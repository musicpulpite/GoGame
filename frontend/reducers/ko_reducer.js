import {merge} from 'lodash';

import {PLACE_PIECE} from '../actions/board_actions.js';


const koReducer = (state = null, action) => {
  switch(action.type) {
    // case PLACE_PIECE:
    //   return ;

    default:
      return state;
  }
};

export default koReducer;
