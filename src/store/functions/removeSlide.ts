import { Editor } from '../types.ts';

export function removeSlide(editor: Editor): Editor {
    if (!editor || !editor.presentation.slides) {
        return editor;
    }

    const slides = editor.presentation.slides ?? [];
    const removedSlideId = editor.selected.slide;
    const filteredSlides = slides.filter(slide => slide.id !== removedSlideId);

    if (filteredSlides.length === slides.length) {
        return editor;
    }

    const removedSlideIndex = slides.findIndex(slide => slide.id === removedSlideId);
    const nextSelectedSlideId = filteredSlides.length > 0
        ? filteredSlides[Math.min(removedSlideIndex, filteredSlides.length - 1)].id
        : undefined;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: filteredSlides,
        },
        selected: {
            ...editor.selected,
            slide: nextSelectedSlideId,
        },
    };
}
