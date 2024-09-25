import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    color?: string;
    iconSrc?: string;
    onClick: () => void;
}

const Button = ({
                    text,
                    color = 'blue',
                    iconSrc,
                    onClick
                }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            style={{backgroundColor: color, padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white'}}
        >
            {iconSrc && <img src={iconSrc} alt="icon" className={styles.button} />}
            {text}
        </button>
    );
};

export default Button;

