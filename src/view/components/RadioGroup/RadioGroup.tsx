import React from 'react';
import { RadioButton } from '../RadioButton/RadioButton';
import styles from './RadioGroup.module.css';

type RadioOption = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

type RadioGroupProps = {
    options: RadioOption[];
    value: string | number;
    onChange: (value: string | number) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
                                                          options,
                                                          value,
                                                          onChange,
                                                      }) => {
    return (
        <div className={styles.radioGroup} role="radiogroup">
            {options.map((option) => (
                <RadioButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    checked={value === option.value}
                    onChange={onChange}
                    disabled={option.disabled}
                />
            ))}
        </div>
    );
};
