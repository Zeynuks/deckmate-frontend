import {v4 as uuidv4} from 'uuid';
import {
    FontWeight,
    ImageObject,
    ObjectID,
    ObjectType,
    Presentation,
    Selected,
    SlideID,
    TextHorizontalAlign,
    TextObject,
    TextVerticalAlign
} from './types';
import image from '../assets/6581494373.jpg';

const presentation: Presentation = {
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
};

const selected: Selected = {
    slideId: presentation.slides[0].id as SlideID,
    objectId: [] as ObjectID[]
};

export const editor = {
    presentation,
    selected
};