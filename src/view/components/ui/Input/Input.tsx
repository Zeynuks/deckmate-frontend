import React, {useRef} from 'react';
import styles from './Input.module.css';

type InputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const Input: React.FC<InputProps> = ({
                                                value,
                                                onChange,
                                                placeholder
                                            }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            inputRef.current?.blur();
        }
    };

    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className={styles.input}
            tabIndex={0}
        />
    );
};
