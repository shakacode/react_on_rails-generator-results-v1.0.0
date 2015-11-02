import React, { PropTypes } from 'react';
import HelloWorldWidget from '../components/HelloWorldWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as helloWorldActionCreators from '../actions/helloWorldActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { $$helloWorldStore: state.$$helloWorldStore };
}

class HelloWorld extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$helloWorldStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  render() {
    const { dispatch, $$helloWorldStore } = this.props;
    const actions = bindActionCreators(helloWorldActionCreators, dispatch);
    return (
      <HelloWorldWidget $$helloWorldStore={$$helloWorldStore} actions={actions} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(HelloWorld);
