import React, { useRef } from 'react';
import styles from './TextArea.module.css';

type TextAreaProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            textAreaRef.current?.blur();
        }
    };

    return (
        <textarea
            ref={textAreaRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className={styles.textarea}
            tabIndex={0}
        />
    );
};
