import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'lib/middlewares/loggerMiddleware';
import reducers from '../reducers';
import { initalStates } from '../reducers';

export default props => {
  const initialName = props.initialName;
  const { $$helloWorldState } = initalStates;
  const initialState = {
    $$helloWorldStore: $$helloWorldState.merge({
      name: initialName,
    }),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
