import React from 'react';
import {Button} from '../Button/Button.tsx';
import trashIcon from '../../../../assets/icons/trash.svg';

interface ContextMenuProps {
    position: { x: number; y: number } | null;
    onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose }) => {
    if (!position) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                zIndex: 1000,
            }}
            onClick={onClose} // Закрываем меню при клике внутри него
        >
            <Button
                iconSrc={trashIcon}
                iconPosition="right"
                color='#FF7B61'
                textColor='#FFFFFF'
            >
                Remove
            </Button>
        </div>
    );
};