import React from 'react';
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
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ActionTypes} from '../../store/actionTypes.ts';
import {RootState} from '../../store/store.ts';

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
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const title = useAppSelector((state: RootState) => state.presentation.title);

    const {addToast} = useToast();
    const dispatch = useDispatch();

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (typeof content === 'string') {
                    const importedState = JSON.parse(content);
                    dispatch({
                        type: ActionTypes.IMPORT_DOCUMENT,
                        payload: importedState
                    });
                }
            } catch (error) {
                console.error('Ошибка при импорте документа', error);
            }
        };
        reader.readAsText(file);
    };

    const handleExport = () => {
        addToast({
            title: 'Экспорт',
            description: 'Документ экспортирован в JSON.',
            type: 'info',
        });
        dispatch({
            type: ActionTypes.EXPORT_DOCUMENT,
        });

    };


    const handleShowToast = (type: 'error') => {
        addToast({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: 'Данная функция actionTypes.ts разработке',
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
                        <Input value={title} onChange={(title) =>
                            dispatch({
                                type: ActionTypes.SET_PRESENTATION_TITLE,
                                payload: title
                            })
                        }/>
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
                            onClick={() => handleImport}/>
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