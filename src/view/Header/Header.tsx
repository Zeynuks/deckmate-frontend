// src/components/Header/Header.tsx
import React from 'react';
import styles from './Header.module.css';
import { Button, IconPosition } from '../components/Button/Button.tsx';
import { Typography } from '../components/Typography/Typography.tsx';
import { useToast } from '../components/Toast/ToastContext.tsx';
import { History } from '../History/History.tsx';
import menuIcon from '../../assets/icons/menu.svg';
import importIcon from '../../assets/icons/import.svg';
import categoryIcon from '../../assets/icons/category.svg';
import playIcon from '../../assets/icons/play.svg';
import shareIcon from '../../assets/icons/send.svg';
import { Input } from '../components/Input/Input.tsx';
import { RootState, useAppSelector } from '../../store/store.ts';
import { useAppActions } from '../../hooks/useAppActions.ts';
import { useImport } from '../../hooks/useImport.ts';
import { useNavigate } from 'react-router';
import useExportToPDF from '../../hooks/useExportToPdf.tsx';

type HeaderProps = {
    description: string;
};

export const Header: React.FC<HeaderProps> = ({ description }) => {
    const title = useAppSelector((state: RootState) => state.presentation.title);
    const slides = useAppSelector((state: RootState) => state.presentation.slides);
    const { setPresentationTitle } = useAppActions();
    const { addToast } = useToast();
    const exportToPDF = useExportToPDF();
    const handleImport = useImport();
    const navigate = useNavigate();

    const handleShowToast = (type: 'error' | 'info') => {
        addToast({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: 'Данная функция в разработке',
            type,
        });
    };

    const viewPresentation = () => {
        navigate('/present');
    };

    const handleExport = async () => {
        try {
            await exportToPDF(slides);
            addToast({
                title: 'Success',
                description: 'Экспорт в PDF завершен успешно!',
                type: 'info',
            });
        } catch (error) {
            console.error(error);
            addToast({
                title: 'Error',
                description: 'Ошибка при экспорте в PDF.',
                type: 'error',
            });
        }
    };

    return (
        <header className={styles.header}>
            <section className={styles.navigation}>
                <Button
                    iconSrc={menuIcon}
                    iconSize={48}
                    className={styles.menuButton}
                    onClick={() => handleShowToast('error')}
                />
            </section>
            <section className={styles.topPanel}>
                <section>
                    <div className={styles.titleBar}>
                        <Input value={title} onChange={(title) => setPresentationTitle(title)} />
                    </div>
                    <Typography variant="description">{description}</Typography>
                </section>
                <History />
                <section className={styles.actions}>
                    <Button
                        iconSrc={importIcon}
                        className={styles.menuButton}
                        onClick={handleExport}
                    />
                    <Button
                        iconSrc={categoryIcon}
                        className={styles.menuButton}
                        onClick={() => {}}
                        isLoading
                        onLoad={handleImport}
                    />
                    <Button
                        iconSrc={playIcon}
                        className={styles.presentButton}
                        iconPosition={IconPosition.Right}
                        onClick={() => viewPresentation()}
                    >
                        Present
                    </Button>
                    <Button
                        iconSrc={shareIcon}
                        className={styles.shareButton}
                        iconPosition={IconPosition.Right}
                        onClick={() => handleShowToast('error')}
                    >
                        Share
                    </Button>
                </section>
            </section>
        </header>
    );
};
