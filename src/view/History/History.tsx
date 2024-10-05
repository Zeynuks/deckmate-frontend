import styles from './History.module.css';
import {Button} from '../components/design-system/Button/Button';

import undoIcon from "../../assets/icons/undo.svg"
import viewIcon from "../../assets/icons/clock.svg"
import redoIcon from "../../assets/icons/redo.svg"

type HistoryProps = {
    onBack: () => void;
    onView: () => void;
    onForward: () => void;
    disabledBack?: boolean;
    disabledView?: boolean;
    disabledForward?: boolean;
};


// @ts-ignore
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
            <Button disabled={disabledBack}
                    iconSrc={undoIcon}
                    onClick={onBack}>
            </Button>
            <Button disabled={disabledView}
                    size={"medium"}
                    iconSrc={viewIcon}
                    onClick={onView}>

            </Button>
            <Button disabled={disabledForward}
                    iconSrc={redoIcon}
                    onClick={onForward}>
            </Button>
        </section>
    );
};
