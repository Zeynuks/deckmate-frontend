import { Editor } from '../types.ts';

export function setObjectAngle(editor: Editor, angle: number): Editor {
    if (!editor) return editor;
    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slideId);
    if (!slide) return editor;
    const updatedObjects = slide.objects.map(object =>
        editor.selected.objectId.includes(object.id)
            ? { ...object, angle: Math.round(angle) }
            : object
    );
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(s =>
                s.id === slide.id ? { ...s, objects: updatedObjects } : s
            ),
        },
    };
}
