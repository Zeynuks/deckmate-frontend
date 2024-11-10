import { createStore } from 'redux';
import rootReducer from './reducers';
import {Editor} from './types.ts';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('editorState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Не удалось загрузить состояние из localStorage', err);
        return undefined;
    }
};

const saveState = (state: Editor) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('editorState', serializedState);
    } catch (err) {
        console.error('Не удалось сохранить состояние в localStorage', err);
    }
};

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
