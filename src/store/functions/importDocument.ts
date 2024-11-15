import { Editor } from '../types';
import { validateDocument } from '../../utils/documentValidation';

// Функция для импорта документа
export function importDocument(editor: Editor, importedState: Editor): Editor {
    if (validateDocument(importedState)) {
        return { ...importedState };
    } else {
        return editor;
    }
}
