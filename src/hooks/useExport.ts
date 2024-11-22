import {useAppActions} from './useAppActions';
import {RootState, useAppSelector} from '../store/store';
import {useToast} from '../view/components/ui/Toast/ToastContext';

export const useExport = () => {
    const { exportDocument } = useAppActions();
    const editor = useAppSelector((state: RootState) => state);
    const { addToast } = useToast();

    return () => {
        try {
            exportDocument();

            const serializedState = JSON.stringify(editor, null, 2);
            const blob = new Blob([serializedState], {type: 'application/json'});
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'presentation.json';
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
