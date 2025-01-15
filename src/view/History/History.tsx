import React from 'react';
import styles from './History.module.css';
import {Button} from '../components/Button/Button.tsx';

import undoIcon from '../../assets/icons/undo.svg';
import viewIcon from '../../assets/icons/clock.svg';
import redoIcon from '../../assets/icons/redo.svg';
import {HistoryContext} from '../../hooks/historyContenx.ts';
import {useAppActions} from '../../hooks/useAppActions.ts';

type HistoryProps = {
    disabledBack?: boolean;
    disabledView?: boolean;
    disabledForward?: boolean;
};

// TODO: Добавить реализацию истории действий

export const History: React.FC<HistoryProps> = ({
                                                    disabledBack = false,
                                                    disabledView = true,
                                                    disabledForward = false
                                                }) => {
    const {setEditor} = useAppActions();
    const history = React.useContext(HistoryContext);

    const onUndo = () => {
        const newEditor = history.undo();
        if (newEditor) {
            setEditor(newEditor);
        }
    };

    const onRedo = () => {
        const newEditor = history.redo();
        if (newEditor) {
            setEditor(newEditor);
        }
    };

    return (
        <section className={styles.history}>
            <Button iconSrc={undoIcon} className={styles.historyButton} disabled={disabledBack} onClick={onUndo}/>
            <Button iconSrc={viewIcon} iconSize={36} className={styles.historyButton} disabled={disabledView} onClick={() => {}}/>
            <Button iconSrc={redoIcon} className={styles.historyButton} disabled={disabledForward} onClick={onRedo}/>
        </section>
    );
};
