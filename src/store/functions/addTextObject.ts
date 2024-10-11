import {Editor, ObjectID, ObjectType, TextObject} from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

export function addTextObject(editor: Editor): Editor {
    if (!editor) {
        return editor;
    }

    const slideId = editor.selected.slideId;
    const slide = editor.presentation.slides.find(slide => slide.id === slideId);

    if (!slide) {
        return editor;
    }

    const newTextObject: TextObject = {
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
        rotation: 0,
        content: 'Text template',
        fontSize: 16,
        fontFamily: 'Arial'
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? { ...slide, objects: [...slide.objects, newTextObject] } : slide
            )
        },
        selected: {
            ...editor.selected,
            objectId: [newTextObject.id],
        }
    };
}
