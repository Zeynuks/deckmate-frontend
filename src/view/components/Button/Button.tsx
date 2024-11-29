import React, { useRef } from 'react';
import styles from './Button.module.css';
import { Typography } from '../Typography/Typography.tsx';

type RequireAtLeastOne<T, K extends keyof T = keyof T> =
    Omit<T, K> & { [P in K]-?: Required<Pick<T, P>> & Partial<Omit<T, P>> }[K];

type RequireBothIfOne<T, K extends keyof T = keyof T> = {
    [P in K]: T[P];
} extends { [P in K]: never }
    ? never
    : T & { [P in K]: T[P] };

export enum IconPosition {
    Left = 'left',
    Right = 'right',
    Top = 'top',
}

interface CommonButtonProps {
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    onLoad?: (file: File) => void;
    onClick?: () => void;
}

interface IconProps {
    iconSrc: string;
    iconPosition: IconPosition;
    iconSize: number;
}

interface TextProps {
    children: React.ReactNode;
    textColor: string;
}

type LoadProps = RequireBothIfOne<CommonButtonProps, 'isLoading' | 'onLoad'>;

type ButtonProps = RequireAtLeastOne<LoadProps & Partial<IconProps & TextProps>, 'iconSrc' | 'children'>;

export const Button: React.FC<ButtonProps> = ({
                                                  iconSrc,
                                                  iconSize = 24,
                                                  iconPosition = IconPosition.Left,
                                                  children,
                                                  className,
                                                  textColor,
                                                  onLoad,
                                                  isLoading = false,
                                                  disabled = false,
                                                  onClick = () => {}
                                              }: ButtonProps): JSX.Element => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
        onClick();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (onLoad) {
                onLoad(file); // Передаем файл в родительский компонент
            }
        }
    };

    const icon = (
        <img
            src={iconSrc}
            alt=""
            className={styles.icon}
            style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
            }}
        />
    );

    return (
        <>
            <button
                onClick={handleButtonClick}
                disabled={disabled}
                className={`${iconPosition === IconPosition.Top ? styles.topIcon : ''} ${styles.button} ${className ? className : styles.defaultButton}`}
            >
                {iconSrc && iconPosition !== IconPosition.Right ? icon : <></>}
                {children && (
                    <Typography color={textColor} variant="buttonText">
                        {children}
                    </Typography>
                )}
                {iconSrc && iconPosition === IconPosition.Right ? icon : <></>}
            </button>

            {isLoading ? <input
                ref={inputFileRef}
                type="file"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />: null}
        </>
    );
};
