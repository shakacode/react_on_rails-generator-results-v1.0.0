import Immutable from 'immutable';

import * as actionTypes from '../constants/helloWorldConstants';

export const $$initialState = Immutable.fromJS({
  name: 'CHANGE ME',
});

export default function helloWorldReducer($$state = $$initialState, action) {
  const { type, name } = action;

  switch (type) {
    case actionTypes.HELLO_WORLD_NAME_UPDATE: {
      return $$state.set('name', name);
    }

    default: {
      return $$state;
    }
  }
}
