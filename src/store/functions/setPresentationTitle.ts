import {Editor} from '../types.ts';

export function setPresentationTitle(editor: Editor, newTitle: string): Editor {
    if (!editor) return editor;
    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slideId);
    if (!slide) return editor;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
           title: newTitle
        },
    };
}
