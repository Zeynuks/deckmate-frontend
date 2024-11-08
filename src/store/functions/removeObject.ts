import { Editor } from '../types.ts';

export function removeObject(editor: Editor): Editor {
    if (!editor) {
        return editor;
    }

    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slide);

    if (!slide) {
        return editor;
    }

    const newObjects = slide.objects.filter(object => !editor.selected.objects.includes(object.id));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === editor.selected.slide ? { ...slide, objects: newObjects } : slide
            )
        },
        selected: {
            ...editor.selected,
            objects: []
        }
    };
}
