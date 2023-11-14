import { createStore } from 'redux';
import { rootReducer } from './root-reducer';

export type AppState = ReturnType<typeof rootReducer>;

export const store = () => {
  return createStore(rootReducer);
};
