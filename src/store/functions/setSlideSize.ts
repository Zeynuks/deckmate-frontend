import { Editor, Size } from '../types.ts';

export function setSlideSize(editor: Editor, size: Size): Editor {
    if (!editor) return editor;
    return {
        ...editor,
       data: {
            ...editor.data,
           slideSize: size
       }
    };
}
