import { v4 as uuidv4 } from 'uuid';
import { Slide, SlideID, ObjectType, TextObject, ObjectID, ImageObject } from './types';

export const emptySlideTemplate: Slide = {
    id: uuidv4() as SlideID,
    background: {
        type: 'color',
        color: '#ffffff'
    },
    objects: []
};
export const emptyTextObjectTemplate: TextObject = {
    id: uuidv4() as ObjectID,
    type: ObjectType.Text,
    size: {
        width: 0,
        height: 0
    },
    position: {
        x: 0,
        y: 0
    },
    content: 'Text template',
    fontSize: 16,
    fontFamily: 'Arial'
};
export const emptyImageObjectTemplate: ImageObject = {
    id: uuidv4() as ObjectID,
    type: ObjectType.Image,
    size: {
        width: 0,
        height: 0
    },
    position: {
        x: 0,
        y: 0
    },
    src: '',
};