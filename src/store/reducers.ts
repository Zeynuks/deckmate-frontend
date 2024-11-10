import {Editor} from './types';
import {EditorActions} from './actions';
import {ActionTypes} from './actionTypes';
import {addSlide} from './functions/addSlide';
import {addImageObject} from './functions/addImageObject';
import {addTextObject} from './functions/addTextObject';
import {removeSlide} from './functions/removeSlide';
import {reorderSlide} from './functions/reorderSlide';
import {setFontSize} from './functions/setFontSize';
import {setFontWeight} from './functions/setFontWeight';
import {setObjectAngle} from './functions/setObjectAngle';
import {setObjectPosition} from './functions/setObjectPosition';
import {setObjectSize} from './functions/setObjectSize';
import {setPresentationTitle} from './functions/setPresentationTitle';
import {setSelected} from './functions/setSelected';
import {defaultEditor} from './templates.ts';
import {importDocument} from "./functions/importDocument.ts";
import {exportDocument} from "./functions/exportDocument.ts";
import {removeObject} from "./functions/removeObject.ts";

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

const editorReducer = (state = getInitialState(), action: EditorActions): Editor => {
    const newState = (() => {
        switch (action.type) {
            case ActionTypes.ADD_SLIDE:
                return addSlide(state);

            case ActionTypes.ADD_IMAGE_OBJECT:
                return addImageObject(state);

            case ActionTypes.ADD_TEXT_OBJECT:
                return addTextObject(state);

            case ActionTypes.REMOVE_SLIDE:
                return removeSlide(state);

            case ActionTypes.REMOVE_OBJECT:
                return removeObject(state);

            case ActionTypes.REORDER_SLIDE:
                return reorderSlide(state, action.payload);

            case ActionTypes.SET_FONT_SIZE:
                return setFontSize(state, action.payload);

            case ActionTypes.SET_FONT_WEIGHT:
                return setFontWeight(state, action.payload);

            case ActionTypes.SET_OBJECT_ANGLE:
                return setObjectAngle(state, action.payload);

            case ActionTypes.SET_OBJECT_POSITION:
                return setObjectPosition(state, action.payload);

            case ActionTypes.SET_OBJECT_SIZE:
                return setObjectSize(state, action.payload);

            case ActionTypes.SET_PRESENTATION_TITLE:
                return setPresentationTitle(state, action.payload);

            case ActionTypes.SET_SELECTED:
                return setSelected(state, action.payload);

            case ActionTypes.IMPORT_DOCUMENT:
                return importDocument(state, action.payload);

            case ActionTypes.EXPORT_DOCUMENT:
                exportDocument(state);
                return state;

            default:
                return state;
        }
    })();

    saveState(newState);
    return newState;
};

export default editorReducer;
