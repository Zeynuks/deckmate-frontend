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
import { useExport } from '../../hooks/useExport.ts';
import { useImport } from '../../hooks/useImport.ts';

type HeaderProps = {
    description: string,
};

export const Header: React.FC<HeaderProps> = ({ description }) => {
    const title = useAppSelector((state: RootState) => state.presentation.title);
    const { setPresentationTitle } = useAppActions();
    const { addToast } = useToast();

    const handleExport = useExport();
    const handleImport = useImport();


    const handleShowToast = (type: 'error' | 'info') => {
        addToast({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: 'Данная функция в разработке',
            type,
        });
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
                        {/*// TODO: Разобраться с длинной Input*/}
                        <Input value={title} onChange={(title) => setPresentationTitle(title)} />
                        {/*<Button iconSrc={arrowDownIcon} className={styles.menuButton}
                                onClick={() => handleShowToast('error')}>
                        </Button>*/}
                    </div>
                    <Typography variant="description">
                        {description}
                    </Typography>
                </section>
                <History/>
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
                        onClick={() => handleShowToast('error')}
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
