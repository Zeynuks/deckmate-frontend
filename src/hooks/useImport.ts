import {useAppActions} from './useAppActions';
import {useToast} from '../view/components/ui/Toast/ToastContext';

export const useImport = () => {
    const { importDocument } = useAppActions();
    const { addToast } = useToast();

    return (file: File) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (typeof content === 'string') {
                    const importedState = JSON.parse(content);
                    importDocument(importedState);
                    addToast({
                        title: 'Импорт',
                        description: 'Документ успешно импортирован',
                        type: 'success',
                    });
                }
            } catch (error) {
                console.error('Ошибка при импорте документа', error);
                addToast({
                    title: 'Импорт',
                    description: 'Ошибка при импорте документа',
                    type: 'error',
                });
            }
        };
        reader.readAsText(file);
    };
};
