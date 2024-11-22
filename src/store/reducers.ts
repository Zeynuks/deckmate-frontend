import {Editor} from './types';
import {ActionTypes} from './actionTypes';
import * as Actions from './functions';
import {defaultEditor} from './templates.ts';
import {ActionsInterfase} from './actions.ts';

const loadState = (): Editor | undefined => {
    try {
        const serializedState = localStorage.getItem('editorState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState) as Editor;
    } catch (error) {
        console.error('Не удалось загрузить состояние из localStorage', error);
        return undefined;
    }
};

const saveState = (state: Editor) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('editorState', serializedState);
    } catch (error) {
        console.error('Не удалось сохранить состояние в localStorage', error);
    }
};

const getInitialState = (): Editor => {
    const savedState = loadState();
    return savedState || defaultEditor;
};


const editorReducer = (state = getInitialState(), action: ActionsInterfase): Editor => {
    const newState = (() => {
        switch (action.type) {
            case ActionTypes.ADD_SLIDE:
                return Actions.addSlide(state);

            case ActionTypes.ADD_IMAGE_OBJECT:
                return Actions.addImageObject(state, action.payload);

            case ActionTypes.ADD_TEXT_OBJECT:
                return Actions.addTextObject(state);

            case ActionTypes.REMOVE_SLIDE:
                return Actions.removeSlide(state);

            case ActionTypes.REMOVE_OBJECT:
                return Actions.removeObject(state);

            case ActionTypes.REORDER_SLIDE:
                return Actions.reorderSlide(state, action.payload);

            case ActionTypes.SET_FONT_SIZE:
                return Actions.setFontSize(state, action.payload);

            case ActionTypes.SET_FONT_WEIGHT:
                return Actions.setFontWeight(state, action.payload);

            case ActionTypes.SET_OBJECT_ANGLE:
                return Actions.setObjectAngle(state, action.payload);

            case ActionTypes.SET_OBJECT_POSITION:
                return Actions.setObjectPosition(state, action.payload);

            case ActionTypes.SET_OBJECT_SIZE:
                return Actions.setObjectSize(state, action.payload);

            case ActionTypes.SET_PRESENTATION_TITLE:
                return Actions.setPresentationTitle(state, action.payload);

            case ActionTypes.SET_SELECTED:
                return Actions.setSelected(state, action.payload);

            case ActionTypes.IMPORT_DOCUMENT:
                return Actions.importDocument(state, action.payload);

            case ActionTypes.SET_SCALE_FACTOR:
                return Actions.setScaleFactor(state, action.payload);

            case ActionTypes.SET_SLIDE_SIZE:
                return Actions.setSlideSize(state, action.payload);

            default:
                return state;
        }
    })();

    saveState(newState);
    return newState;
};

export default editorReducer;
