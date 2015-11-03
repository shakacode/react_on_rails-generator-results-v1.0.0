import React from 'react';
import HelloWorld from '../containers/HelloWorld';

const helloWorldAppServer = props => {
  const reactComponent = (
    <HelloWorld {...props} />
  );
  return reactComponent;
};

export default helloWorldAppServer;
