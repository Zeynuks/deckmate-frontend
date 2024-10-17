import {Editor, ObjectID, ObjectType, ImageObject} from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

export function addImageObject(editor: Editor): Editor {
    if (!editor) {
        return editor;
    }

    const slideId = editor.selected.slideId;
    const slide = editor.presentation.slides.find(slide => slide.id === slideId);

    if (!slide) {
        return editor;
    }

    const newImageObject: ImageObject = {
        id: uuidv4() as ObjectID,
        type: ObjectType.Image,
        size: {
            width: 100,
            height: 100
        },
        position: {
            x: 0,
            y: 0
        },
        angle: 0,
        src: '',
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? { ...slide, objects: [...slide.objects, newImageObject] } : slide
            )
        },
        selected: {
            ...editor.selected,
            objectId: [...editor.selected.objectId, newImageObject.id],
        }
    };
}
