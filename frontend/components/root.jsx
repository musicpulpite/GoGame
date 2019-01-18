import React from 'react';
import { Provider } from 'react-redux';

import Row from './row.jsx';

const Root = ({store}) => {
  const rows = [0,1,2,3,4,5,6,7,8].map((idx) => <Row row={idx} key={idx}/>);
  return (
    <Provider store={store}>
      {rows}
    </Provider>
  )
};

export default Root;
