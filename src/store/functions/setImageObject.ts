import {Editor, ImageObject, ObjectType} from '../types.ts';

export function setImageObject(editor: Editor, image: ImageObject): Editor {
    if (!editor) return editor;
    const slide = editor.presentation.slides.find(slide => slide.id === editor.selected.slide);
    if (!slide) return editor;

    const updatedObjects = slide.objects.map(object => {
        if (editor.selected.objects.includes(object.id) && object.type === ObjectType.Image) {
            return image;
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