import { v4 as uuidv4 } from 'uuid';
import {SlideID, ObjectType, ObjectID, Presentation, Selected} from './types';
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
                    rotation: 0,
                    type: ObjectType.Text,
                    content: 'This is a full text object',
                    fontSize: 60,
                    fontFamily: 'Nunito',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'hsl(120, 100%, 50%)'
                },
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
                    rotation: 0,
                    type: ObjectType.Image,
                    src: image,
                    altText: 'Sample image'
                },
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
                    rotation: 0,
                    type: ObjectType.Image,
                    src: image,
                    altText: 'Sample image'
                }
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
                color: '#FFFFFF',
            },
            objects: []
        }
    ]
};

const selected: Selected = {
    slideId: presentation.slides[0].id as SlideID,
    objectId: [presentation.slides[0].objects[0].id, presentation.slides[0].objects[1].id] as ObjectID[]
};

export const editor = {
    presentation,
    selected
};