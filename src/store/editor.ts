import {Editor} from './types.ts';
import {editor} from "./templates.ts";


let _editor = editor;

let _handler: Function = Function || null;

export const getEditor = () => {
    return _editor
}

export const setEditor = (newEditor: Editor) => {
    _editor = newEditor
}

export const dispatch = (modifyFunction: Function, payload?: Object) => {
    const newEditor = modifyFunction(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}

export const addEditorChangeHandler = (handler: Function) => {
    _handler = handler;
}