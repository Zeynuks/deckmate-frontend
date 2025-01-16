import { Editor } from '../types';
import { validateDocument } from '../../utils/documentValidation';

export function importDocument(editor: Editor, importedState: Editor): Editor {
    if (validateDocument(importedState)) {
        return { ...importedState };
    } else {
      return editor;
    }
}
