import { Editor } from '../types.ts';

export function removeObject(editor: Editor): Editor {
    if (!editor) {
        return editor;
    }
    const slideId = editor.selected.slideId;
    const slide = editor.presentation.slides.find(slide => slide.id === slideId);

    if (!slide) {
        return editor;
    }

    const newObjects = slide.objects.filter(object => !editor.selected.objectId.includes(object.id));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? { ...slide, objects: newObjects } : slide
            )
        },
        selected: {
            ...editor.selected,
            objectId: []
        }
    };
}
