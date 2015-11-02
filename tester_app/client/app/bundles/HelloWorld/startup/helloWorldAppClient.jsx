import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store/helloWorldStore';
import HelloWorld from '../containers/HelloWorld';

const helloWorldAppClient = props => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      <HelloWorld />
    </Provider>
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default helloWorldAppClient;
