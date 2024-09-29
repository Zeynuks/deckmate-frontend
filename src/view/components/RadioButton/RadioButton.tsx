import React from 'react';
import styles from './RadioButton.module.css';

type RadioButtonProps = {
    label: string;
    value: string | number;
    checked: boolean;
    onChange: (value: string | number) => void;
    disabled?: boolean;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
                                                            label,
                                                            value,
                                                            checked,
                                                            onChange,
                                                            disabled = false,
                                                        }) => {
    const handleClick = () => {
        if (!disabled) {
            onChange(value);
        }
    };

    return (
        <div
            className={`${styles.radioButton} ${checked ? styles.checked : ''} ${
                disabled ? styles.disabled : ''
            }`}
            onClick={handleClick}
            role="radio"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
        >
            <div className={styles.outerCircle}>
                {checked && <div className={styles.innerCircle}></div>}
            </div>
            <span className={styles.label}>{label}</span>
        </div>
    );
};
