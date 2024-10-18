import React from "react";
import styles from './Button.module.css';
import {Typography} from '../Typography/Typography';

/**
 * Утилитный тип, который требует наличие хотя бы одного указанного свойства.
 *
 * @template T - Тип объекта.
 * @template K - Ключи, из которых хотя бы одно свойство должно быть обязательным.
 */
type RequireAtLeastOne<T, K extends keyof T = keyof T> =
    Omit<T, K> & { [P in K]-?: Required<Pick<T, P>> & Partial<Omit<T, P>> }[K];


// TODO: Узнать как лучше обработать IconPosition
/**
 * Позиции иконки относительно текста в кнопке.
 *
 * @enum {string}
 */
export enum IconPosition {
    Left = 'left',
    Right = 'right',
    Top = 'top',
}

/**
 * Общие свойства для компонента кнопки.
 *
 * @property {string} [className] - Дополнительный CSS-класс для стилизации кнопки.
 * @property {boolean} [disabled] - Флаг, указывающий, является ли кнопка неактивной.
 * @property {() => void} onClick - Функция-обработчик события клика по кнопке.
 */
interface CommonButtonProps {
    className?: string;
    disabled?: boolean;
    onClick: () => void;
}

/**
 * Свойства, относящиеся к иконке.
 *
 * @property {string} iconSrc - URL-адрес изображения иконки.
 * @property {IconPosition} iconPosition - Позиция иконки относительно текста.
 * @property {number} iconSize - Размер иконки в пикселях.
 */
interface IconProps {
    iconSrc: string;
    iconPosition: IconPosition;
    iconSize: number;
}

/**
 * Свойства для кнопки с текстом.
 *
 * @property {React.ReactNode} children - Текст кнопки или её дочерние элементы.
 * @property {string} textColor - Цвет текста кнопки.
 */
interface TextProps {
    children: React.ReactNode;
    textColor: string;
}

/**
 * Свойства для компонента Button, включающие хотя бы одно из свойств: иконку или текст.
 *
 */
type ButtonProps = RequireAtLeastOne<CommonButtonProps & Partial<IconProps & TextProps>, 'iconSrc' | 'children'>;

/**
 * Компонент кнопки, поддерживающий наличие иконки и/или текста.
 *
 * @param {ButtonProps} props Свойства компонента.
 * @param {string} [props.iconSrc] - URL-адрес изображения иконки (если задано).
 * @param {number} [props.iconSize=24] - Размер иконки (если задано).
 * @param {IconPosition} [props.iconPosition=IconPosition.Left] - Позиция иконки относительно текста (если задано).
 * @param {React.ReactNode} [props.children] - Текст кнопки или её дочерние элементы.
 * @param {string} [props.textColor] - Цвет текста кнопки.
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации кнопки.
 * @param {boolean} [props.disabled=false] - Флаг, указывающий на неактивное состояние кнопки.
 * @param {() => void} props.onClick - Обработчик события клика по кнопке.
 * @returns {JSX.Element} Компонент кнопки.
 */
export const Button: React.FC<ButtonProps> = ({
                                                  iconSrc,
                                                  iconSize = 24,
                                                  iconPosition = IconPosition.Left,
                                                  children,
                                                  className,
                                                  textColor,
                                                  disabled = false,
                                                  onClick,
                                              }: ButtonProps): JSX.Element => {
    const icon = <img
        src={iconSrc}
        alt=""
        className={styles.icon}
        style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`
        }}
    />;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${iconPosition === IconPosition.Top? styles.topIcon: ''} ${styles.button} ${className? className: styles.defaultButton}`}
        >
            {iconSrc && iconPosition !== IconPosition.Right ? icon : <></>}
            {children && (
                <Typography color={textColor} variant="buttonText">
                    {children}
                </Typography>
            )}
            {iconSrc && iconPosition === IconPosition.Right ? icon : <></>}
        </button>
    );
};
