import {Editor, FontWeight, ObjectType, TextObject} from '../types.ts';

export function setFontWeight(editor: Editor, newFontWeight: FontWeight): Editor {
    if (!editor) return editor;
    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slideId);
    if (!slide) return editor;

    const updatedObjects = slide.objects.map(object => {
        if (editor.selected.objectId.includes(object.id) && object.type === ObjectType.Text) {
            const textObject = object as TextObject;
            return {
                ...textObject,
                style: {
                    ...textObject.style,
                    fontWeight: newFontWeight,
                },
            };
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