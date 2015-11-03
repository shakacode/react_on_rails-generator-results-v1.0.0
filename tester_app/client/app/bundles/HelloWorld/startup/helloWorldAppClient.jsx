import React from 'react';
import HelloWorld from '../containers/HelloWorld';

const helloWorldAppClient = props => {
  const reactComponent = (
    <HelloWorld {...props} />
  );
  return reactComponent;
};

export default helloWorldAppClient;
