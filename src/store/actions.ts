import {ActionTypes} from './actionTypes';
import {Editor, ImageObject, TextObject, Background} from './types';

interface SetText {
    type: ActionTypes.SET_TEXT;
    payload: TextObject;
}

interface SetSlideBackground {
    type: ActionTypes.SET_SLIDE_BACKGROUND;
    payload: Background;
}

interface ImportDocumentAction {
    type: ActionTypes.IMPORT_DOCUMENT;
    payload: Editor;
}

interface SetEditorAction {
    type: ActionTypes.SET_EDITOR;
    payload: Editor;
}

interface AddSlideAction {
    type: ActionTypes.ADD_SLIDE;
}

interface AddImageObjectAction {
    type: ActionTypes.ADD_IMAGE_OBJECT;
    payload: ImageObject;
}

interface AddTextObjectAction {
    type: ActionTypes.ADD_TEXT_OBJECT;
    payload: TextObject;
}

interface RemoveSlideAction {
    type: ActionTypes.REMOVE_SLIDE;
}

interface RemoveObjectAction {
    type: ActionTypes.REMOVE_OBJECT;
}


interface ReorderSlideAction {
    type: ActionTypes.REORDER_SLIDE;
    payload: number;
}

interface SetImageObjectAction {
    type: ActionTypes.SET_IMAGE_OBJECT;
    payload: ImageObject;
}

interface SetObjectAngleAction {
    type: ActionTypes.SET_OBJECT_ANGLE;
    payload: number
}

interface SetObjectPositionAction {
    type: ActionTypes.SET_OBJECT_POSITION;
    payload: { x: number; y: number };
}

interface SetObjectSizeAction {
    type: ActionTypes.SET_OBJECT_SIZE;
    payload: { width: number; height: number };
}

interface SetPresentationTitleAction {
    type: ActionTypes.SET_PRESENTATION_TITLE;
    payload: string;
}

interface SetSelectedAction {
    type: ActionTypes.SET_SELECTED;
    payload: { slide?: string, objects: string[] };
}

interface SetScaleFactorAction {
    type: ActionTypes.SET_SCALE_FACTOR;
    payload: number
}

interface SetSlideSizeAction {
    type: ActionTypes.SET_SLIDE_SIZE;
    payload: { width: number; height: number };
}

const setText = (textObject: TextObject): SetText => ({
    type: ActionTypes.SET_TEXT,
    payload: textObject,
});
const setSlideBackground = (background: Background): SetSlideBackground => ({
    type: ActionTypes.SET_SLIDE_BACKGROUND,
    payload: background,
});

const setEditor = (newEditor: Editor): SetEditorAction => ({
    type: ActionTypes.SET_EDITOR,
    payload: newEditor,
});

const importDocument = (importedEditor: Editor): ImportDocumentAction => ({
    type: ActionTypes.IMPORT_DOCUMENT,
    payload: importedEditor,
});

const addSlide = (): AddSlideAction => ({
    type: ActionTypes.ADD_SLIDE,
});

const addImageObject = (imageObject: ImageObject): AddImageObjectAction => ({
    type: ActionTypes.ADD_IMAGE_OBJECT,
    payload: imageObject,
});

const addTextObject = (textObject: TextObject): AddTextObjectAction => ({
    type: ActionTypes.ADD_TEXT_OBJECT,
    payload: textObject
});

const removeSlide = (): RemoveSlideAction => ({
    type: ActionTypes.REMOVE_SLIDE,
});

const removeObject = (): RemoveObjectAction => ({
    type: ActionTypes.REMOVE_OBJECT,
});

const reorderSlide = (newIndex: number): ReorderSlideAction => ({
    type: ActionTypes.REORDER_SLIDE,
    payload: newIndex,
});

const setObjectAngle = (angle: number): SetObjectAngleAction => ({
    type: ActionTypes.SET_OBJECT_ANGLE,
    payload: angle,
});

const setObjectPosition = (x: number, y: number): SetObjectPositionAction => ({
    type: ActionTypes.SET_OBJECT_POSITION,
    payload: {x, y},
});

const setObjectSize = (width: number, height: number): SetObjectSizeAction => ({
    type: ActionTypes.SET_OBJECT_SIZE,
    payload: {width, height},
});

const setImageObject = (image: ImageObject): SetImageObjectAction => ({
    type: ActionTypes.SET_IMAGE_OBJECT,
    payload: image,
});

const setPresentationTitle = (title: string): SetPresentationTitleAction => ({
    type: ActionTypes.SET_PRESENTATION_TITLE,
    payload: title,
});

const setSelected = (slide?: string, objects: string[] = []): SetSelectedAction => ({
    type: ActionTypes.SET_SELECTED,
    payload: {slide, objects: objects},
});

const setScaleFactor = (scaleFactor: number): SetScaleFactorAction => ({
    type: ActionTypes.SET_SCALE_FACTOR,
    payload: scaleFactor,
});

const setSlideSize = (width: number, height: number): SetSlideSizeAction => ({
    type: ActionTypes.SET_SLIDE_SIZE,
    payload: {width, height},
});

export type ActionsInterfase =
    | SetText
    | AddSlideAction
    | AddImageObjectAction
    | AddTextObjectAction
    | RemoveSlideAction
    | RemoveObjectAction
    | ReorderSlideAction
    | SetObjectAngleAction
    | SetObjectPositionAction
    | SetObjectSizeAction
    | SetPresentationTitleAction
    | SetSelectedAction
    | ImportDocumentAction
    | SetScaleFactorAction
    | SetSlideSizeAction
    | SetImageObjectAction
    | SetSlideBackground
    | SetEditorAction;

export const ActionCreators = {
    importDocument,
    addSlide,
    addImageObject,
    addTextObject,
    removeSlide,
    removeObject,
    reorderSlide,
    setObjectAngle,
    setObjectPosition,
    setObjectSize,
    setPresentationTitle,
    setSelected,
    setScaleFactor,
    setSlideSize,
    setImageObject,
    setEditor,
    setSlideBackground,
    setText
};
