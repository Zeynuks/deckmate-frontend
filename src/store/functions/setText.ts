import {Editor, ObjectType, TextObject} from '../types.ts';

export function setText(editor: Editor, newObject: TextObject): Editor {
    if (!editor) return editor;
    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slide);
    if (!slide) return editor;

    const updatedObjects = slide.objects.map(object => {
        if (editor.selected.objects.includes(object.id) && object.type === ObjectType.Text) {
            return newObject;
        }
        return object;
    });

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