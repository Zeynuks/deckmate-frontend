import React from 'react';
import styles from './Switch.module.css';

type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
};

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, disabled }) => {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={styles.input}
            />
            <span className={styles.slider}></span>
        </label>
    );
};
