import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store/helloWorldStore';
import HelloWorldContainer from '../containers/HelloWorldContainer';

const helloWorldEntryComponent = props => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      <HelloWorldContainer />
    </Provider>
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default helloWorldEntryComponent;
