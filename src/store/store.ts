import { createStore } from 'redux';
import editorReducer from './reducers';

const store = createStore(editorReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
