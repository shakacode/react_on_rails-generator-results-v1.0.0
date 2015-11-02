import React, { PropTypes } from 'react';
import HelloWorldWidget from '../components/HelloWorldWidget';

// Simple example of a React component
export default class HelloWorld extends React.Component {
  static propTypes = {
    initialName: PropTypes.string.isRequired, // this is passed from the Rails view
  }

  state = {name: this.props.initialName} // how to set initial state in es2015 class syntax

  updateName(name) {
    this.setState({name: name});
  }

  render() {
    return (
      <div>
        <HelloWorldWidget name={this.state.name} updateName={::this.updateName} />
      </div>
    );
  }
}
