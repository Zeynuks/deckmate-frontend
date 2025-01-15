import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import {Button} from '../Button/Button.tsx';
import styles from './ColorPicker.module.css';

interface ColorPickerPopupProps {
    srcIcon: string;
    onColorSelect: (color: string) => void;
}

const ColorPickerPopup: React.FC<ColorPickerPopupProps> = ({ srcIcon, onColorSelect }) => {
    const [color, setColor] = useState<string>('#ff0000');
    const [visible, setVisible] = useState<boolean>(false);

    const handleChange = (newColor: ColorResult): void => {
        const newHex = newColor.hex;
        setColor(newHex);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Button className={styles.select} iconSrc={srcIcon} onClick={() => setVisible((prev) => !prev)}></Button>

            {visible && (
                <div
                    className={styles.wrapper}
                >
                    <SketchPicker color={color} onChange={handleChange}/>

                    <button className={styles.closeButton} style={{}} onClick={() => {
                        setVisible(false);
                        onColorSelect(color);
                    }}>&#10005;</button>
                </div>
            )}
        </div>
    );
};

export default ColorPickerPopup;
