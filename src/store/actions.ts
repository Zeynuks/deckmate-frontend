import {ActionTypes} from './actionTypes';
import {Editor, ImageObject} from './types';

interface ImportDocumentAction {
    type: ActionTypes.IMPORT_DOCUMENT;
    payload: Editor;
}

interface ExportDocumentAction {
    type: ActionTypes.EXPORT_DOCUMENT;
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

interface SetFontSizeAction {
    type: ActionTypes.SET_FONT_SIZE;
    payload: number;
}

interface SetFontWeightAction {
    type: ActionTypes.SET_FONT_WEIGHT;
    payload: number;
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

const importDocument = (editor: Editor): ImportDocumentAction => ({
    type: ActionTypes.IMPORT_DOCUMENT,
    payload: editor,
});

const exportDocument = (): ExportDocumentAction => ({
    type: ActionTypes.EXPORT_DOCUMENT,
});

const addSlide = (): AddSlideAction => ({
    type: ActionTypes.ADD_SLIDE,
});

const addImageObject = (imageObject: ImageObject): AddImageObjectAction => ({
    type: ActionTypes.ADD_IMAGE_OBJECT,
    payload: imageObject,
});

const addTextObject = (): AddTextObjectAction => ({
    type: ActionTypes.ADD_TEXT_OBJECT,
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

const setFontSize = (fontSize: number): SetFontSizeAction => ({
    type: ActionTypes.SET_FONT_SIZE,
    payload: fontSize,
});

const setFontWeight = (fontWeight: number): SetFontWeightAction => ({
    type: ActionTypes.SET_FONT_WEIGHT,
    payload: fontWeight,
});

const setObjectAngle = (angle: number): SetObjectAngleAction => ({
    type: ActionTypes.SET_OBJECT_ANGLE,
    payload: angle,
});

const setObjectPosition = (x: number, y: number): SetObjectPositionAction => ({
    type: ActionTypes.SET_OBJECT_POSITION,
    payload: { x, y },
});

const setObjectSize = (width: number, height: number): SetObjectSizeAction => ({
    type: ActionTypes.SET_OBJECT_SIZE,
    payload: { width, height },
});

const setPresentationTitle = (title: string): SetPresentationTitleAction => ({
    type: ActionTypes.SET_PRESENTATION_TITLE,
    payload: title,
});

const setSelected = (slide?: string, objects: string[] = []): SetSelectedAction => ({
    type: ActionTypes.SET_SELECTED,
    payload: { slide, objects: objects },
});

export type ActionsInterfase =
    | AddSlideAction
    | AddImageObjectAction
    | AddTextObjectAction
    | RemoveSlideAction
    | RemoveObjectAction
    | ReorderSlideAction
    | SetFontSizeAction
    | SetFontWeightAction
    | SetObjectAngleAction
    | SetObjectPositionAction
    | SetObjectSizeAction
    | SetPresentationTitleAction
    | SetSelectedAction
    | ImportDocumentAction
    | ExportDocumentAction;

export const ActionCreators = {
    importDocument,
    exportDocument,
    addSlide,
    addImageObject,
    addTextObject,
    removeSlide,
    removeObject,
    reorderSlide,
    setFontSize,
    setFontWeight,
    setObjectAngle,
    setObjectPosition,
    setObjectSize,
    setPresentationTitle,
    setSelected,
};
