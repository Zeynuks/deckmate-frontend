import { Editor, Position } from '../types.ts';

export function setObjectPos(editor: Editor, newPosition: Position): Editor {
    if (!editor) return editor;
    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slide);
    if (!slide) return editor;

    const updatedObjects = slide.objects.map(object =>
        editor.selected.objects.includes(object.id)
            ? { ...object, position: {x: Math.round(newPosition.x), y: Math.round(newPosition.y) } }
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
