import {
    Editor,
    TextObject,
} from '../types.ts';

export function addTextObject(editor: Editor, newTextObject: TextObject): Editor {
    if (!editor || !editor.selected?.slide) {
        return editor;
    }

    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selected.slide);

    if (slideIndex === -1) {
        return editor;
    }



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
