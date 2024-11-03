import { Editor } from '../types';

export function reorderSlides(
    editor: Editor,
    payload: { fromIndex: number; toIndex: number }
): Editor {
    if (!editor) {
        return editor;
    }

    const slides = editor.presentation.slides || [];
    const { fromIndex, toIndex } = payload;

    if (
        fromIndex < 0 ||
        fromIndex >= slides.length ||
        toIndex < 0 ||
        toIndex >= slides.length
    ) {
        return editor;
    }

    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selected: {
            ...editor.selected,
        },
    };
}
