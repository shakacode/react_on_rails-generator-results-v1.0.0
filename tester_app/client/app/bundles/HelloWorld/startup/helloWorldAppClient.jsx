import React from 'react';
import HelloWorld from '../containers/HelloWorld';

const helloWorldAppClient = props => {
  const reactComponent = (
    <HelloWorld {...props} />
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default helloWorldAppClient;
