import styles from './Header.module.css';
import {Button} from '../components/design-system/Button/Button';
import {Typography} from '../components/design-system/Typography/Typography';
import {useToast} from '../components/design-system/Toast/ToastContext';
import {History} from '../History/History';

import menuIcon from '../../assets/icons/menu.svg';
import arrowDownIcon from '../../assets/icons/arrow-down.svg';
import importIcon from '../../assets/icons/import.svg';
import categoryIcon from '../../assets/icons/category.svg';
import playIcon from '../../assets/icons/play.svg';
import shareIcon from '../../assets/icons/send.svg';

type HeaderProps = {
    title: string
    description: string,
};

export const Header: React.FC<HeaderProps> = ({
                                                  title,
                                                  description,
                                              }) => {
    const {addToast} = useToast();

    const handleShowToast = (type: 'success' | 'error' | 'warning' | 'info') => {
        addToast({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: `This is a ${type} message.`,
            type,
        });
    };


    return (
        <header className={styles.header}>
            <section className={styles.navigation}>
                <Button iconSrc={menuIcon} color={'none'}
                        size={'large'}
                        onClick={() => handleShowToast('success')}>
                </Button>
            </section>
            <section className={styles.topPanel}>
                <section>
                    <div className={styles.titleBar}>
                        <Typography variant="title" as="h1">
                            {title}
                        </Typography>
                        <Button iconSrc={arrowDownIcon} color={'none'}
                                onClick={() => handleShowToast('success')}>
                        </Button>
                    </div>
                    <Typography variant="description">
                        {description}
                    </Typography>
                </section>
                <History
                    onBack={() => handleShowToast('warning')}
                    onView={() => handleShowToast('warning')}
                    onForward={() => handleShowToast('warning')}
                ></History>
                <section className={styles.actions}>
                    <Button iconSrc={importIcon}
                            color={'none'}
                            onClick={() => handleShowToast('success')}>
                    </Button>
                    <Button iconSrc={categoryIcon}
                            color={'none'}
                            onClick={() => handleShowToast('info')}>
                    </Button>
                    <Button iconSrc={playIcon}
                            color={'#7B61FF'}
                            textColor={'#FFFFFF'}
                            onClick={() => handleShowToast('error')}
                            iconPosition={'right'}>
                        Present
                    </Button>
                    <Button iconSrc={shareIcon}
                            color={'#000000'}
                            textColor={'#FFFFFF'}
                            onClick={() => handleShowToast('info')}
                            iconPosition={'right'}>
                        Share
                    </Button>
                </section>
            </section>
        </header>
    );
};
