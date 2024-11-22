import { Editor } from '../types.ts';

export function setScaleFactor(editor: Editor, scaleFactor: number): Editor {
    if (!editor) return editor;
    return {
        ...editor,
        data: {
            ...editor.data,
            scaleFactor: scaleFactor
        }
    };
}
