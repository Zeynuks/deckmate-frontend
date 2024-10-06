import React, { useEffect, useState, CSSProperties } from 'react';
import styles from './Toast.module.css';
import successIcon from '../../../../assets/icons/tick-circle.svg';
import errorIcon from '../../../../assets/icons/close-circle.svg';
import warningIcon from '../../../../assets/icons/info-circle.svg';
import infoIcon from '../../../../assets/icons/more-circle.svg';
import { Typography } from "../Typography/Typography.tsx";
import {Button} from "../Button/Button.tsx";

interface Message {
    id: number;
    title: string;
    description: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

interface ToastProps {
    message: Message;
    onClose: () => void;
    duration?: number;
    style?: CSSProperties;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 5000, style }) => {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            handleClose();
        }, duration);
        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    const getIcon = () => {
        switch (message.type) {
            case 'success':
                return successIcon;
            case 'error':
                return errorIcon;
            case 'warning':
                return warningIcon;
            case 'info':
            default:
                return infoIcon;
        }
    };

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const getProgressClass = () => {
        switch (message.type) {
            case 'success':
                return styles.successProgress;
            case 'error':
                return styles.errorProgress;
            case 'warning':
                return styles.warningProgress;
            case 'info':
            default:
                return styles.infoProgress;
        }
    };

    return (
        <div
            className={`${styles.toast} ${exiting ? styles.toastExit : ''} ${styles[message.type || 'info']}`}
            role="alert"
            aria-live="assertive"
            style={style}
            onClick={handleClose}
        >
            <div className={styles.toastContent}>
                <Button iconSrc={getIcon()} size={"small"} onClick={() => {}}></Button>
                <div className={styles.message}>
                    <Typography variant="toastTitle">{message.title}</Typography>
                    <Typography color={"#666666"} variant="toastDescription">
                        {message.description}
                    </Typography>
                </div>
            </div>
            <div className={`${styles.progress} ${getProgressClass()}`}></div>
        </div>
    );
};

export default Toast;
