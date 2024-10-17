import React from 'react';
import styles from './Button.module.css';
import {Typography} from '../Typography/Typography';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
        Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

type ButtonBaseProps = {
    onClick: () => void;
    children?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    iconSrc?: string;
    iconPosition?: 'left' | 'right' | 'top' | 'middle';
    textColor?: string;
    color?: string;
    border?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
};

type ButtonProps = RequireAtLeastOne<ButtonBaseProps, 'iconSrc' | 'children'>;

/**
 * Компонент кнопки, который может содержать текст, иконку, настраиваемый цвет и размер.
 * Требует наличия хотя бы одного из свойств `iconSrc` или `children`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {() => void} props.onClick - Обработчик клика по кнопке
 * @param {React.ReactNode} [props.children] - Текст или контент, который будет отображаться внутри кнопки
 * @param {'small' | 'medium' | 'large'} [props.size='small'] - Размер кнопки
 * @param {string} [props.iconSrc] - Путь к изображению иконки
 * @param {'left' | 'right' | 'top' | 'middle'} [props.iconPosition='left'] - Положение иконки относительно текста
 * @param {string} [props.textColor] - Цвет текста внутри кнопки
 * @param {string} [props.color] - Цвет фона кнопки
 * @param {boolean} [props.border=false] - Показывать ли границу вокруг кнопки
 * @param {boolean} [props.disabled=false] - Состояние отключенной кнопки
 * @param {boolean} [props.fullWidth=false] - Растягивать ли кнопку на всю ширину контейнера
 *
 * @returns {JSX.Element} JSX элемент кнопки
 */
export const Button: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  children,
                                                  size = 'small',
                                                  iconSrc,
                                                  iconPosition = 'left',
                                                  textColor,
                                                  color,
                                                  border = false,
                                                  disabled = false,
                                                  fullWidth = false,
                                              }) => {
    const isIconOnly = !!iconSrc && !children;
    const iconSize = size === 'small' ? 24 : size === 'large' ? 48 : 36;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${border ? styles.border : ''} ${isIconOnly ? styles.iconOnly : ''} ${iconPosition === 'top' ? styles.iconTop : ''} ${fullWidth ? styles.fullWidth : styles.autoWidth}`}
            style={{
                backgroundColor: isIconOnly ? 'transparent' : color || 'transparent',
                color: isIconOnly ? '#000' : textColor,
            }}
            tabIndex={0}
        >
            {iconSrc && iconPosition === 'left' && (
                <img
                    src={iconSrc}
                    alt=""
                    className={styles.icon}
                    style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`
                    }}
                />
            )}
            {iconSrc && iconPosition === 'top' && (
                <img
                    src={iconSrc}
                    alt=""
                    className={styles.icon}
                    style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`
                    }}
                />
            )}
            {children && (
                <Typography color={textColor} variant="buttonText">
                    {children}
                </Typography>
            )}
            {iconSrc && iconPosition === 'right' && (
                <img
                    src={iconSrc}
                    alt=""
                    className={styles.icon}
                    style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`
                    }}
                />
            )}
        </button>
    );
};
