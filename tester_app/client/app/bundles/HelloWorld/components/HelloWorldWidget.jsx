import React, { PropTypes } from 'react';
import _ from 'lodash';

// Simple example of a React "dumb" component
export default class HelloWorldWidget extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, '_handleChange');
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    updateName: PropTypes.func.isRequired,
  };

  // React will automatically provide us with the event `e`
  _handleChange(e) {
    const name = e.target.value;
    this.props.updateName(name);
  }

  render() {
    const _handleChange = this._handleChange;
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
