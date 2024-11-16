import {Editor, Slide} from '../types.ts';
import {v4 as uuidv4} from 'uuid';

export function addSlide(editor: Editor): Editor {
    if (!editor) {
        return editor;
    }
    const emptySlideTemplate: Slide = {
        id: uuidv4(),
        size: {width: 1920, height: 1080},
        background: {
            type: 'color',
            color: '#ffffff'
        },
        objects: []
    };
    return <Editor>{
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, emptySlideTemplate]
        },
        selected: {
            ...editor.selected,
            slides: emptySlideTemplate.id,
        }
    };
}