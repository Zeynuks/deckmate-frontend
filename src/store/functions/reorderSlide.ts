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

    if (
        fromIndex === -1 ||
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
            slide: movedSlide.id,
        },
    };
}
