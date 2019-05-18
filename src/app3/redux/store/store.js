import { createStore } from 'redux';
import rootReducer from '../reducers/login.reducer';

export const store = createStore(
  rootReducer
);