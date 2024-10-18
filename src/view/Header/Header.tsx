import React from "react";
import styles from './Header.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button.tsx';
import {Typography} from '../components/ui/Typography/Typography.tsx';
import {useToast} from '../components/ui/Toast/ToastContext.tsx';
import {History} from '../History/History.tsx';
import menuIcon from '../../assets/icons/menu.svg';
import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import importIcon from '../../assets/icons/import.svg';
import categoryIcon from '../../assets/icons/category.svg';
import playIcon from '../../assets/icons/play.svg';
import shareIcon from '../../assets/icons/send.svg';
import {Input} from "../components/ui/Input/Input.tsx";
import {dispatch} from "../../store/editor.ts";
import {setPresentationTitle} from '../../store/functions/setPresentationTitle.ts'

type HeaderProps = {
    title: string
    description: string,
};

// TODO: Добавить меню
// TODO: Добавить изменение названия презентации
// TODO: Добавить меню презентации
// TODO: Добавить функционал кнопкам событий

export const Header: React.FC<HeaderProps> = ({
                                                  title,
                                                  description,
                                              }) => {
    const {addToast} = useToast();

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
                        <Input value={title} onChange={(value) => dispatch(setPresentationTitle, value)}/>
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
                            onClick={() => handleShowToast('error')}/>
                    <Button iconSrc={categoryIcon} className={styles.menuButton}
                            onClick={() => handleShowToast('error')}/>
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