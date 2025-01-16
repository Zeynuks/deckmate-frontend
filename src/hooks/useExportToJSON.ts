import {RootState, useAppSelector} from '../store/store';
import {useToast} from '../view/components/Toast/ToastContext';

export const useExportToJSON = () => {
    const editor = useAppSelector((state: RootState) => state);
    const {addToast} = useToast();

    let fileName = editor.presentation.title;
    fileName = fileName.replace(/^[^\wа-яА-ЯёЁ]+/g, '');
    fileName = fileName.replace(/\s+/g, '_');
    fileName = fileName.replace(/[\\/:*?"<>|.]/g, '');
    fileName = fileName? fileName: 'presentation';

    return () => {
        try {
            const serializedState = JSON.stringify(editor, null, 2);
            const blob = new Blob([serializedState], {type: 'application/json'});
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.json`;
            link.click();

            URL.revokeObjectURL(url);

            addToast({
                title: 'Экспорт',
                description: 'Документ успешно экспортирован',
                type: 'success',
            });
        } catch (error) {
            console.error('Ошибка при экспорте документа', error);
            addToast({
                title: 'Экспорт',
                description: 'Ошибка при экспорте документа',
                type: 'error',
            });
        }
    };
};
