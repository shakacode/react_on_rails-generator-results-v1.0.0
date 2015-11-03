import React, { PropTypes } from 'react';
import HelloWorld from '../components/HelloWorld';

// Simple example of a React component
export default class HelloWorldContainer extends React.Component {
  static displayName = 'HelloWorldContainer';

  static propTypes = {
    initialName: PropTypes.string.isRequired, // this is passed from the Rails view
  }

  state = {name: this.props.initialName} // how to set initial state in es2015 class syntax

  updateName(name) {
    this.setState({name: name});
  }

  render() {
    const updateName = ::this.updateName;
    const name = this.state.name;
    return (
      <div>
        <HelloWorld name={name} updateName={updateName} />
      </div>
    );
  }
}
