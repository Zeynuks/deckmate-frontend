import React from 'react';
import styles from './ContextMenu.module.css';
import {Button} from '../Button/Button.tsx';

type ContextMenuProps = {
    position: { x: number; y: number } | null;
    onRemove: () => void;
}

// TODO: Добаботать интерфейс и содержание ContextMenu

export const ContextMenu: React.FC<ContextMenuProps> = ({ position, onRemove }) => {
    if (!position) return null;

    return (
        <div
           className={styles.contextMenu}
           style={{
               top: position.y,
               left: position.x,
           }}>
            <Button onClick={onRemove}>Remove</Button>
        </div>
    );
};