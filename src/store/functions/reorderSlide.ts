import { Editor } from '../types';

export function reorderSlide(
    editor: Editor,
    toIndex: number
): Editor {
    if (!editor || !editor.selected?.slide) {
        return editor;
    }

    const slides = editor.presentation.slides || [];
    const fromIndex = slides.findIndex(slide => slide.id === editor.selected.slide);

    if (toIndex < 0) {
        toIndex = 0;
    }

    if (toIndex >= slides.length) {
        toIndex = slides.length - 1;
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
    };
}
