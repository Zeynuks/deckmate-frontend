import {ActionTypes} from './actionTypes';
import {ObjectID, SlideID} from './types';

export interface AddSlideAction {
    type: ActionTypes.ADD_SLIDE;
}

export interface AddImageObjectAction {
    type: ActionTypes.ADD_IMAGE_OBJECT;
}

export interface AddTextObjectAction {
    type: ActionTypes.ADD_TEXT_OBJECT;
}

export interface RemoveSlideAction {
    type: ActionTypes.REMOVE_SLIDE;
}

export interface ReorderSlideAction {
    type: ActionTypes.REORDER_SLIDE;
    payload: number;
}

export interface SetFontSizeAction {
    type: ActionTypes.SET_FONT_SIZE;
    payload: number;
}

export interface SetFontWeightAction {
    type: ActionTypes.SET_FONT_WEIGHT;
    payload: number;
}

export interface SetObjectAngleAction {
    type: ActionTypes.SET_OBJECT_ANGLE;
    payload: number
}

export interface SetObjectPositionAction {
    type: ActionTypes.SET_OBJECT_POSITION;
    payload: { x: number; y: number };
}

export interface SetObjectSizeAction {
    type: ActionTypes.SET_OBJECT_SIZE;
    payload: { width: number; height: number };
}

export interface SetPresentationTitleAction {
    type: ActionTypes.SET_PRESENTATION_TITLE;
    payload: string;
}

export interface SetSelectedAction {
    type: ActionTypes.SET_SELECTED;
    payload: { slide?: SlideID, objects: ObjectID[] };
}

export type EditorActions =
    | AddSlideAction
    | AddImageObjectAction
    | AddTextObjectAction
    | RemoveSlideAction
    | ReorderSlideAction
    | SetFontSizeAction
    | SetFontWeightAction
    | SetObjectAngleAction
    | SetObjectPositionAction
    | SetObjectSizeAction
    | SetPresentationTitleAction
    | SetSelectedAction;