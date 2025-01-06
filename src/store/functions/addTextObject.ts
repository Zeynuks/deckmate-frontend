import {
    Editor,
    FontStyle,
    FontWeight,
    ObjectType,
    TextHorizontalAlign,
    TextObject,
    TextVerticalAlign
} from '../types.ts';
import {v4 as uuidv4} from 'uuid';

export function addTextObject(editor: Editor): Editor {
    if (!editor || !editor.selected?.slide) {
        return editor;
    }

    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selected.slide);

    if (slideIndex === -1) {
        return editor;
    }

    const newTextObject: TextObject = {
        id: uuidv4(),
        type: ObjectType.Text,
        size: { width: 100, height: 100 },
        position: { x: 0, y: 0 },
        angle: 0,
        content: [{text: 'Text template'}],
        style: {
            fontSize: 60,
            fontFamily: 'Nunito',
            fontWeight: FontWeight.W400,
            fontStyle: FontStyle.Normal,
            underline: false,
            overline: false,
            horizontalAlign: TextHorizontalAlign.Middle,
            verticalAlign: TextVerticalAlign.Middle,
            color: '#000000',
            backgroundColor: '#ffffff'
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
