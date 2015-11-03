import React, { PropTypes } from 'react';

// Simple example of a React component
export default class HelloWorldWidget extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    updateName: PropTypes.func.isRequired,
  };

  _handleChange() {
    const name = this.refs.name.value;
    this.props.updateName(name);
  }

  render() {
    const _handleChange = ::this._handleChange;
    const name = this.props.name;
    return (
      <div>
        <h3>
          Hello, {name}!
        </h3>
        <p>
          Say hello to:
          <input type="text" ref="name" value={name} onChange={_handleChange} />
        </p>
      </div>
    );
  }
}
