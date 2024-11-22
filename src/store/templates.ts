import {v4 as uuidv4} from 'uuid';
import {BackgroundType, Editor, Presentation, PresentationData, Selected} from './types';

const presentation: Presentation = {
    title: 'Full Presentation',
    slides: [
        {
            id: uuidv4(),
            size: {
                width: 1920,
                height: 1080
            },
            background: {
                type: BackgroundType.Color,
                color: '#FFFFFF'
            },
            objects: []
        },
        {
            id: uuidv4(),
            size: {
                width: 1920,
                height: 1080
            },
            background: {
                type: BackgroundType.Color,
                color: '#FFFFFF'
            },
            objects: []
        }
    ]
};

const selected: Selected = {
    slide: presentation.slides[0].id,
    objects: [] as string[]
};

const data: PresentationData = {
    scaleFactor: 1,
    slideSize: {width: 1920, height: 1080}
};

export const defaultEditor: Editor = {
    presentation,
    data,
    selected
};