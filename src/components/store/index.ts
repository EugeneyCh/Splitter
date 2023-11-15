import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;