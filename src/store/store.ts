import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';
import { Editor } from './types.ts';
import { validateDocument } from '../utils/documentValidation.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('editorState');
        if (serializedState === null) {
            return undefined;
        }
        const parsedState: Editor = JSON.parse(serializedState);

        if (!validateDocument(parsedState)) {
            console.error('Загруженные данные из localStorage не прошли валидацию');
            return undefined;
        }

        return parsedState;
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
