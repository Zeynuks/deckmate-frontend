import {
    Editor,
    FontWeight,
    ImageObject,
    ObjectID,
    ObjectType,
    SlideID,
    TextHorizontalAlign,
    TextObject,
    TextVerticalAlign
} from './types';
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
import {v4 as uuidv4} from 'uuid';
import image from '../assets/6581494373.jpg';

const initialState: Editor = {
    presentation: {
        title: 'Full Presentation',
        slides: [
            {
                id: uuidv4() as SlideID,
                size: {
                    width: 1920,
                    height: 1080
                },
                background: {
                    type: 'color',
                    color: '#FFFFFF'
                },
                objects: [
                    {
                        id: uuidv4() as ObjectID,
                        size: {
                            width: 500,
                            height: 200
                        },
                        position: {
                            x: 1000,
                            y: 20
                        },
                        angle: 0,
                        type: ObjectType.Text,
                        content: [
                            {
                                text: 'This is a full text object.'
                            },
                            {
                                text: 'I\'m do drag&drop',
                                style: {
                                    fontSize: 96,
                                    fontFamily: 'Nunito',
                                    fontWeight: FontWeight.Bold,
                                    textHorizontalAlign: TextHorizontalAlign.Left,
                                    textVerticalAlign: TextVerticalAlign.Start,
                                    color: 'hsl(0,100%,50%)'
                                }
                            }
                        ],
                        style: {
                            fontSize: 60,
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.Bold,
                            textHorizontalAlign: TextHorizontalAlign.Middle,
                            textVerticalAlign: TextVerticalAlign.Start,
                            color: 'hsl(120, 100%, 50%)'
                        }
                    } as TextObject,
                    {
                        id: uuidv4() as ObjectID,
                        size: {
                            width: 192,
                            height: 108
                        },
                        position: {
                            x: 200,
                            y: 300
                        },
                        angle: 0,
                        type: ObjectType.Image,
                        src: image,
                        altText: 'Sample image'
                    } as ImageObject,
                    {
                        id: uuidv4() as ObjectID,
                        size: {
                            width: 500,
                            height: 200
                        },
                        position: {
                            x: 20,
                            y: 700
                        },
                        angle: 0,
                        type: ObjectType.Image,
                        src: image,
                        altText: 'Sample image'
                    } as ImageObject
                ]
            },
            {
                id: uuidv4() as SlideID,
                size: {
                    width: 1920,
                    height: 1080
                },
                background: {
                    type: 'color',
                    color: '#FFFFFF'
                },
                objects: []
            }
        ]
    },
    selected: {
        slide: undefined,
        objects: []
    }
};

const editorReducer = (state = initialState, action: EditorActions): Editor => {
    switch (action.type) {
        case ActionTypes.ADD_SLIDE:
            return addSlide(state);

        case ActionTypes.ADD_IMAGE_OBJECT:
            return addImageObject(state);

        case ActionTypes.ADD_TEXT_OBJECT:
            return addTextObject(state);

        case ActionTypes.REMOVE_SLIDE:
            return removeSlide(state);

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

        default:
            return state;
    }
};

export default editorReducer;
