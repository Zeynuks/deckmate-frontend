import styles from './History.module.css';
import {Button} from '../components/ui/Button/Button.tsx';

import undoIcon from '../../assets/icons/undo.svg';
import viewIcon from '../../assets/icons/clock.svg';
import redoIcon from '../../assets/icons/redo.svg';

type HistoryProps = {
    onBack: () => void;
    onView: () => void;
    onForward: () => void;
    disabledBack?: boolean;
    disabledView?: boolean;
    disabledForward?: boolean;
};

// TODO: Добавить реализацию истории действий

export const History: React.FC<HistoryProps> = ({
                                                    onBack,
                                                    onView,
                                                    onForward,
                                                    disabledBack = true,
                                                    disabledView = false,
                                                    disabledForward = true
                                                }) => {
    return (
        <section className={styles.history}>
            <Button iconSrc={undoIcon} className={styles.historyButton} disabled={disabledBack} onClick={onBack}/>
            <Button iconSrc={viewIcon} iconSize={36} className={styles.historyButton} disabled={disabledView} onClick={onView}/>
            <Button iconSrc={redoIcon} className={styles.historyButton} disabled={disabledForward} onClick={onForward}/>
        </section>
    );
};
