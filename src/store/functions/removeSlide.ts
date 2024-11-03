import {Editor} from '../types.ts';

export function removeSlide(editor: Editor): Editor {
    if(!editor) {
        return editor;
    }
    const removedSlideId = editor.selected.slideId;
    const slides = editor.presentation.slides || [];
    const removeSlideIndex = slides.findIndex(slide => slide.id === removedSlideId);
    const newSlides = editor.presentation.slides.filter(slide => slide.id !== removedSlideId);
    let newSelectedSlideId = null;
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1);
        newSelectedSlideId = newSlides[index].id;
    }
    return <Editor>{
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selected: {
            slideId: newSelectedSlideId,

        }
    };
}
