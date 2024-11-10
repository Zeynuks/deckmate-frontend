import { Editor } from '../types';
import { validateDocument } from '../../utils/documentValidation';

export function exportDocument(editor: Editor): void {
    if (!validateDocument(editor)) {
        console.error('Ошибка: документ не прошел валидацию перед экспортом');
        return;
    }

    const serializedState = JSON.stringify(editor, null, 2);
    const blob = new Blob([serializedState], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.json';
    link.click();

    URL.revokeObjectURL(url);
}
