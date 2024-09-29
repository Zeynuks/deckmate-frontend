import styles from './Button.module.css';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
        Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

type ButtonBaseProps = {
    onClick: () => void;
    iconSrc?: string;
    iconPosition?: 'left' | 'right';
    color?: string;
    textColor?: string;
    disabled?: boolean;
    children?: React.ReactNode;
};

type ButtonProps = RequireAtLeastOne<ButtonBaseProps, 'iconSrc' | 'children'>;

export const Button: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  children,
                                                  iconSrc,
                                                  iconPosition = 'left',
                                                  color,
                                                  textColor,
                                                  disabled = false,
                                              }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={styles.button}
            style={{ backgroundColor: color, color: textColor }}
            tabIndex={0}
        >
            {!!iconSrc && iconPosition === 'left' && (
                <img src={iconSrc} alt="" className={styles.icon} />
            )}
            {!!children && <span>{children}</span>}
            {!!iconSrc && iconPosition === 'right' && (
                <img src={iconSrc} alt="" className={styles.icon} />
            )}
        </button>
    );
};
