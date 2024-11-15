import styles from './Header.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button.tsx';
import {Typography} from '../components/ui/Typography/Typography.tsx';
import {useToast} from '../components/ui/Toast/ToastContext.tsx';
import {History} from '../History/History.tsx';
import menuIcon from '../../assets/icons/menu.svg';
// import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import importIcon from '../../assets/icons/import.svg';
import categoryIcon from '../../assets/icons/category.svg';
import playIcon from '../../assets/icons/play.svg';
import shareIcon from '../../assets/icons/send.svg';
import {Input} from '../components/ui/Input/Input.tsx';
import {RootState, useAppSelector} from '../../store/store.ts';
import {useAppActions} from '../../hooks/useAppActions.ts';

type HeaderProps = {
    description: string,
};

// TODO: Добавить меню
// TODO: Добавить изменение названия презентации
// TODO: Добавить меню презентации
// TODO: Добавить функционал кнопкам событий

export const Header: React.FC<HeaderProps> = ({
                                                  description,
                                              }) => {
    const title = useAppSelector((state: RootState) => state.presentation.title);
    const {importDocument, exportDocument, setPresentationTitle} = useAppActions();
    const {addToast} = useToast();

    const handleExport = () => {
        try {
            exportDocument();
            addToast({
                title: 'Экспорт',
                description: 'Документ экспортирован в JSON',
                type: 'info',
            });
        } catch (error) {
            console.error('Ошибка при экспорте документа', error);
            addToast({
                title: 'Ошибка',
                description: 'Ошибка при экспорте документа',
                type: 'error',
            });
        }
    };

    const handleFileUpload = (file: File) => {
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
                        type: 'info',
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

    const handleShowToast = (type: 'error') => {
        addToast({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: 'Данная функция в разработке',
            type,
        });
    };

    return (
        <header className={styles.header}>
            <section className={styles.navigation}>
                <Button iconSrc={menuIcon} iconSize={48} className={styles.menuButton}
                        onClick={() => handleShowToast('error')}/>
            </section>
            <section className={styles.topPanel}>
                <section>
                    <div className={styles.titleBar}>
                        {/*// TODO: Разобраться с длинной Input*/}
                        <Input value={title} onChange={(title) => setPresentationTitle(title)}/>
                        {/*<Button iconSrc={arrowDownIcon} className={styles.menuButton}*/}
                        {/*        onClick={() => handleShowToast('error')}>*/}
                        {/*</Button>*/}
                    </div>
                    <Typography variant="description">
                        {description}
                    </Typography>
                </section>
                <History
                    onBack={() => handleShowToast('error')}
                    onView={() => handleShowToast('error')}
                    onForward={() => handleShowToast('error')}
                ></History>
                <section className={styles.actions}>
                    <Button iconSrc={importIcon} className={styles.menuButton}
                            onClick={() => handleExport()}/>
                    <Button iconSrc={categoryIcon} className={styles.menuButton}
                            onClick={() => () => {
                            }} isLoading onLoad={handleFileUpload}/>
                    <Button iconSrc={playIcon} className={styles.presentButton} iconPosition={IconPosition.Right}
                            onClick={() => handleShowToast('error')}>
                        Present
                    </Button>
                    <Button iconSrc={shareIcon} className={styles.shareButton} iconPosition={IconPosition.Right}
                            onClick={() => handleShowToast('error')}>
                        Share
                    </Button>
                </section>
            </section>
        </header>
    );
};