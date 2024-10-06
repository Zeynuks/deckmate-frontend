import React, {useEffect, useRef, useState} from 'react';
import styles from './InputDropdown.module.css';
import {Typography} from '../Typography/Typography';

export type DropdownOption = {
    label: string;
    value: string | number;
};

type InputDropdownProps = {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const InputDropdown: React.FC<InputDropdownProps> = ({
                                                                options,
                                                                value,
                                                                onChange,
                                                                placeholder = 'Введите значение',
                                                            }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<DropdownOption[]>(options);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (value === '') {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    setIsOpen(true);
                    e.preventDefault();
                }
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setHighlightedIndex(prev =>
                        prev < filteredOptions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                        const selectedOption = filteredOptions[highlightedIndex];
                        handleOptionSelect(selectedOption);
                    } else {
                        setIsOpen(false);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                    break;
                default:
                    break;
            }
        };

        const inputCurrent = inputRef.current;
        inputCurrent?.addEventListener('keydown', handleKeyDown);

        return () => {
            inputCurrent?.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, highlightedIndex, filteredOptions]);

    const handleOptionSelect = (option: DropdownOption) => {
        onChange(option.label);
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.focus();
    };

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    ref={inputRef}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className={styles.input}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls="dropdown-listbox"
                />
                <button
                    type="button"
                    className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`}
                    onClick={toggleDropdown}
                    aria-label="Toggle dropdown"
                >
                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`${styles.arrowIcon} ${isOpen ? styles.arrowUp : styles.arrowDown}`}
                    >
                        <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.984l-6 6-6-6z"/>
                    </svg>
                </button>
            </div>
            {isOpen && (
                <ul
                    className={styles.dropdown}
                    role="listbox"
                    id="dropdown-listbox"
                    ref={dropdownRef}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                key={option.value}
                                role="option"
                                aria-selected={value === option.label}
                                className={`${styles.option} ${
                                    index === highlightedIndex ? styles.highlighted : ''
                                } ${value === option.label ? styles.selected : ''}`}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => handleOptionSelect(option)}
                            >
                                <Typography variant="inputText">{option.label}</Typography>
                            </li>
                        ))
                    ) : (
                        <li className={styles.noOptions}>
                            <Typography variant="inputText">Нет доступных опций</Typography>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};
