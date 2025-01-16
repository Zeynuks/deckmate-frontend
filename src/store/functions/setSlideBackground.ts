import {
    Editor,
    Background,
} from '../types.ts';

export function setSlideBackground(editor: Editor, background: Background): Editor {
    if (!editor) return editor;

    const slide = editor.presentation.slides.find(
        (slide) => slide.id === editor.selected.slide
    );

    if (!slide) return editor;

    const updatedSlide = {
        ...slide,
        background,
    };

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((s) =>
                s.id === slide.id ? updatedSlide : s
            ),
        },
    };
}
