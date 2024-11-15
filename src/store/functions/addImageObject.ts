import {Editor, ImageObject} from '../types.ts';

export function addImageObject(editor: Editor, image: ImageObject): Editor {
    if (!editor) {
        return editor;
    }

    const slideId = editor.selected.slide;
    const slide = editor.presentation.slides.find(slide => slide.id === slideId);

    if (!slide) {
        return editor;
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? { ...slide, objects: [...slide.objects, image] } : slide
            )
        },
        selected: {
            ...editor.selected,
            objects: [...editor.selected.objects, image.id],
        }
    };
}
