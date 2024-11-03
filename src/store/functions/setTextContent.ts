import {Editor, ObjectID} from '../types';

// export function setTextContent(
//     editor: Editor,
//     payload: { objectId: ObjectID; content: string }
// ): Editor {
//     const { objectId, content } = payload;
//     const updatedSlides = editor.presentation.slides.map((slide) => {
//         const updatedObjects = slide.objects.map((obj) => {
//             if (obj.id === objectId && obj.type === 'text') {
//                 return { ...obj, content };
//             }
//             return obj;
//         });
//         return { ...slide, objects: updatedObjects };
//     });
//     return {
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             slides: updatedSlides,
//         },
//     };
// }

export function setTextStyle(
    editor: Editor,
    payload: {
        objectId: ObjectID;
        fontWeight?: 'normal' | 'bold';
        fontStyle?: 'normal' | 'italic';
    }
): Editor {
    const { objectId, ...styleProps } = payload;
    const updatedSlides = editor.presentation.slides.map((slide) => {
        const updatedObjects = slide.objects.map((obj) => {
            if (obj.id === objectId && obj.type === 'text') {
                return { ...obj, ...styleProps };
            }
            return obj;
        });
        return { ...slide, objects: updatedObjects };
    });
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}
