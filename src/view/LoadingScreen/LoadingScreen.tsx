import styles from './LoadingScreen.module.css';

const LoadingScreen: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loader}>
                <div className={styles.loadingBar}>
                    <div className={styles.loadingProgress}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
