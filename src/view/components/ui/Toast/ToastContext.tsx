import React, { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';
import styles from './Toast.module.css';
interface Message {
    id: number;
    title: string;
    description: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextProps {
    addToast: (message: Omit<Message, 'id'>) => void;
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Message[]>([]);

    const addToast = (message: Omit<Message, 'id'>) => {
        const id = ++toastId;

        setToasts((prevToasts) => {
            if (prevToasts.length >= 5) {
                return [...prevToasts.slice(1), { id, ...message }];
            }
            return [...prevToasts, { id, ...message }];
        });

        setTimeout(() => {
            removeToast(id);
        }, 5000);

        setTimeout(() => {
            removeToast(id);
        }, 5000);
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {ReactDOM.createPortal(
                <div className={styles.toastContainer}>
                    {toasts.map((toast, index) => (
                        <Toast
                            key={toast.id}
                            message={toast}
                            onClose={() => removeToast(toast.id)}
                            style={{ top: `${index * 80}px` }}
                        />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};
