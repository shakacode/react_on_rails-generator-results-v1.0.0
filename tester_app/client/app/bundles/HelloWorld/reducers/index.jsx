// This file is our manifest of all reducers for the app.
// See /client/app/bundles/HelloWorld/store/helloWorldStore.jsx
import helloWorldReducer from './helloWorldReducer';
import { $$initialState as $$helloWorldState } from './helloWorldReducer';

export default {
  $$helloWorldStore: helloWorldReducer,
};

export const initalStates = {
  $$helloWorldState,
};
