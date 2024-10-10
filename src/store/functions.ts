import { Presentation, Slide, Selected, ObjectType, Background, TextObject, ImageObject } from './types';

export function addSlide(
    presentation: Presentation,
    newSlideTemplate: Slide
): Presentation {
    return {
        ...presentation,
        slides: [...presentation.slides, newSlideTemplate]
    };
}

export function removeSlide(
    presentation: Presentation,
    selected: Selected
): Presentation {
    const updatedSlides = presentation.slides.filter(slide => slide.id !== selected.slideId);

    return {
        ...presentation,
        slides: updatedSlides
    };
}


export function reorderSlides(
    presentation: Presentation,
    selected: Selected,
    afterSlideIndex: number
): Presentation {
    const slides = [...presentation.slides];

    // const selectedSlides = slides.filter(slide => selected.slideId.includes(slide.id));
    const selectedSlides = slides.filter(slide => selected.slideId === slide.id);

    // const remainingSlides = slides.filter(slide => !selected.slideId.includes(slide.id));
    const remainingSlides = slides.filter(slide => selected.slideId !== slide.id);

    remainingSlides.splice(afterSlideIndex + 1, 0, ...selectedSlides);

    return {
        ...presentation,
        slides: remainingSlides
    };
}


export function addSlideObject(
    presentation: Presentation,
    selected: Selected,
    newObjectTemplate: TextObject | ImageObject
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === selected.slideId) {
            const updatedObjects = [...slide.objects, newObjectTemplate];
            return {
                ...slide,
                objects: updatedObjects
            };
        }
        return slide;
    });
    return {
        ...presentation,
        slides: updatedSlides
    };
}

export function removeSlideObjects(
    presentation: Presentation,
    selected: Selected
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === selected.slideId) {
            const updatedObjects = slide.objects.filter(object => !selected.objectId.includes(object.id));
            return {
                ...slide,
                objects: updatedObjects
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides
    };
}

function changeObjectsPosition(
    presentation: Presentation,
    slideSelection: Selected,
    offsetX: number,
    offsetY: number
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === slideSelection.slideId) {
            const updatedObjects = slide.objects.map(object => {
                if (slideSelection.objectId.includes(object.id)) {
                    return {
                        ...object,
                        position: {
                            x: object.position.x + offsetX,
                            y: object.position.y + offsetY,
                        },
                    };
                }
                return object;
            });
            return {
                ...slide,
                objects: updatedObjects,
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function changeObjectsSize(
    presentation: Presentation,
    slideSelection: Selected,
    offsetWidth: number,
    offsetHeight: number
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === slideSelection.slideId) {
            const updatedObjects = slide.objects.map(object => {
                if (slideSelection.objectId.includes(object.id)) {
                    return {
                        ...object,
                        size: {
                            width: object.size.width + offsetWidth,
                            height: object.size.height + offsetHeight,
                        },
                    };
                }
                return object;
            });
            return {
                ...slide,
                objects: updatedObjects,
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function changeTextContent(
    presentation: Presentation,
    slideSelection: Selected,
    newContent: string
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === slideSelection.slideId) {
            const updatedObjects = slide.objects.map(object => {
                if (slideSelection.objectId.includes(object.id) && object.type === ObjectType.Text) {
                    return {
                        ...object,
                        content: newContent,
                    };
                }
                return object;
            });
            return {
                ...slide,
                objects: updatedObjects,
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function changeFontSize(
    presentation: Presentation,
    slideSelection: Selected,
    newFontSize: number
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === slideSelection.slideId) {
            const updatedObjects = slide.objects.map(object => {
                if (slideSelection.objectId.includes(object.id) && object.type === ObjectType.Text) {
                    return {
                        ...object,
                        fontSize: newFontSize,
                    };
                }
                return object;
            });
            return {
                ...slide,
                objects: updatedObjects,
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function changeFontFamily(
    presentation: Presentation,
    slideSelection: Selected,
    newFontFamily: string
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === slideSelection.slideId) {
            const updatedObjects = slide.objects.map(object => {
                if (slideSelection.objectId.includes(object.id) && object.type === ObjectType.Text) {
                    return {
                        ...object,
                        fontFamily: newFontFamily,
                    };
                }
                return object;
            });
            return {
                ...slide,
                objects: updatedObjects,
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides,
    };
}

function changeSlideBackground(
    presentation: Presentation,
    slideSelection: Selected,
    newBackground: Background
): Presentation {
    const updatedSlides = presentation.slides.map(slide => {
        if (slide.id === slideSelection.slideId) {
            return {
                ...slide,
                background: newBackground,
            };
        }
        return slide;
    });

    return {
        ...presentation,
        slides: updatedSlides,
    };
}


export const functions = {
    reorderSlides,
    addSlide,
    removeSlide,
    addSlideObject,
    removeSlideObjects,
    changeObjectsPosition,
    changeObjectsSize,
    changeTextContent,
    changeFontSize,
    changeFontFamily,
    changeSlideBackground
};



