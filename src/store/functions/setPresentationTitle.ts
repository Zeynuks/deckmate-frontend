import {Editor} from '../types.ts';

export function setPresentationTitle(editor: Editor, newTitle: string): Editor {
     if (!editor) return editor;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
           title: newTitle
        },
    };
}
