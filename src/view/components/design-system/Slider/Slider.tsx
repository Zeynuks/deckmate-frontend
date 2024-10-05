import React from 'react';
import styles from './Slider.module.css';

type SliderProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
};

export const Slider: React.FC<SliderProps> = ({
                                                  value,
                                                  onChange,
                                                  min = 0,
                                                  max = 100,
                                                  step = 1,
                                                  disabled,
                                              }) => {
    return (
        <input
            type="range"
            className={styles.slider}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
        />
    );
};
