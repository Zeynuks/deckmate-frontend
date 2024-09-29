import React from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
                                                      label,
                                                      checked,
                                                      onChange,
                                                      disabled,
                                                  }) => (
    <label className={styles.checkbox}>
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className={styles.input}
        />
        <span className={styles.label}>{label}</span>
    </label>
);
