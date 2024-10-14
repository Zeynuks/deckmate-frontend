import {Editor} from './types.ts';
import {editor} from './templates.ts';


let _editor = editor;

let _handler: Function = Function || null;

export const getEditor = () => {
    return _editor;
};

export const setEditor = (editor: Editor) => {
    _editor = editor;
};

export const dispatch = (modifyFunction: Function, payload?: object | number) => {
    const editor = modifyFunction(_editor, payload);
    setEditor(editor);

    if (_handler) {
        _handler();
    }
};

export const addEditorChangeHandler = (handler: Function) => {
    _handler = handler;
};