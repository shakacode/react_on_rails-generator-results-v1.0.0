import React from 'react';
import HelloWorldContainer from '../containers/HelloWorldContainer';

const helloWorldServerEntryComponent = props => {
  const reactComponent = (
    <HelloWorldContainer {...props} />
  );
  return reactComponent;
};

// Export is needed for the hot reload server
export default helloWorldServerEntryComponent;
