import { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css';
import exampleIcon from '../../../example-icon.svg';

export type SelectOption = {
    label: string;
    value: string | number;
};

type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Функция сравнения опций
    function areOptionsEqual(
        o1: SelectOption | undefined,
        o2: SelectOption | undefined
    ) {
        if (o1 === undefined || o2 === undefined) return false;
        return o1.value === o2.value;
    }

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined);
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if ((value as SelectOption[]).some((o) => areOptionsEqual(o, option))) {
                onChange(
                    (value as SelectOption[]).filter((o) => !areOptionsEqual(o, option))
                );
            } else {
                onChange([...(value as SelectOption[]), option]);
            }
        } else {
            if (!areOptionsEqual(option, value as SelectOption | undefined)) onChange(option);
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple
            ? (value as SelectOption[]).some((o) => areOptionsEqual(o, option))
            : areOptionsEqual(option, value as SelectOption | undefined);
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target !== containerRef.current) return;
            switch (e.code) {
                case 'Enter':
                case 'Space':
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                    if (isOpen) selectOption(options[highlightedIndex]);
                    break;
                case 'ArrowUp':
                case 'ArrowDown': {
                    e.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue =
                        highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue);
                    }
                    break;
                }
                case 'Escape':
                    setIsOpen(false);
                    break;
            }
        };
        containerRef.current?.addEventListener('keydown', handler);

        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        };
    }, [isOpen, highlightedIndex, options]);

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={0}
            className={styles.container}
        >
      <span className={styles.value}>
        {multiple
            ? (value as SelectOption[]).map((v) => (
                <button
                    key={v.value}
                    onClick={(e) => {
                        e.stopPropagation();
                        selectOption(v);
                    }}
                    className={styles['option-badge']}
                >
                    {v.label}
                    <img
                        src={exampleIcon}
                        alt="Remove"
                        className={styles['remove-btn-icon']}
                    />
                </button>
            ))
            : (value as SelectOption | undefined)?.label}
      </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className={styles['clear-btn']}
            >
                <img
                    src={exampleIcon}
                    alt="Clear"
                    className={styles['clear-btn-icon']}
                />
            </button>
            <div className={styles.divider}></div>
            <button
                className={styles.caret}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
            >
                <img
                    src={exampleIcon}
                    alt="Toggle"
                    className={styles['caret-icon']}
                />
            </button>
            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {options.map((option, index) => (
                    <li
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        className={`${styles.option} ${
                            isOptionSelected(option) ? styles.selected : ''
                        } ${index === highlightedIndex ? styles.highlighted : ''}`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
