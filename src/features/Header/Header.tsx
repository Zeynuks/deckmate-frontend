import styles from './Header.module.css';
import {Button} from '../../view/components/ui/Button/Button.tsx';
import {Typography} from '../../view/components/ui/Typography/Typography.tsx';
import {useToast} from '../../view/components/ui/Toast/ToastContext.tsx';
import {History} from '../History/History.tsx';
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

    const handleShowToast = (type: 'error') => {
        addToast({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: `Данная функция находится в разработке`,
            type,
        });
    };


    return (
        <header className={styles.header}>
            <section className={styles.navigation}>
                <Button iconSrc={menuIcon} color={'none'}
                        size={'large'}
                        onClick={() => handleShowToast('error')}>
                </Button>
            </section>
            <section className={styles.topPanel}>
                <section>
                    <div className={styles.titleBar}>
                        <Typography variant="title" as="h1">
                            {title}
                        </Typography>
                        <Button iconSrc={arrowDownIcon} color={'none'}
                                onClick={() => handleShowToast('error')}>
                        </Button>
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
                    <Button iconSrc={importIcon}
                            color={'none'}
                            onClick={() => handleShowToast('error')}>
                    </Button>
                    <Button iconSrc={categoryIcon}
                            color={'none'}
                            onClick={() => handleShowToast('error')}>
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
                            onClick={() => handleShowToast('error')}
                            iconPosition={'right'}>
                        Share
                    </Button>
                </section>
            </section>
        </header>
    );
};