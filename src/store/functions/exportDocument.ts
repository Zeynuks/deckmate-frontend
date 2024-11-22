import { Editor } from '../types';
import { validateDocument } from '../../utils/documentValidation';

export function exportDocument(editor: Editor): void {
    if (!validateDocument(editor)) {
        throw Error('Ошибка: документ не прошел валидацию перед экспортом');
    }
}
