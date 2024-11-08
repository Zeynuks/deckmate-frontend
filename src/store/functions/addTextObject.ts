import {
    Editor,
    FontWeight,
    ObjectID,
    ObjectType,
    TextHorizontalAlign,
    TextObject,
    TextVerticalAlign
} from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

export function addTextObject(editor: Editor): Editor {
    if (!editor || !editor.selected?.slide) {
        return editor;
    }

    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selected.slide);

    if (slideIndex === -1) {
        return editor;
    }

    const newTextObject: TextObject = {
        id: uuidv4() as ObjectID,
        type: ObjectType.Text,
        size: { width: 100, height: 100 },
        position: { x: 0, y: 0 },
        angle: 0,
        content: [{text: 'Text template'}],
        style: {
            fontSize: 60,
            fontFamily: 'Nunito',
            fontWeight: FontWeight.Normal,
            textHorizontalAlign: TextHorizontalAlign.Left,
            textVerticalAlign: TextVerticalAlign.Start,
            color: '#000000'
        }
    };

    const updatedSlides = [...editor.presentation.slides];
    updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        objects: [...updatedSlides[slideIndex].objects, newTextObject]
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        },
        selected: {
            ...editor.selected,
            objects: [newTextObject.id],
        }
    };
}
