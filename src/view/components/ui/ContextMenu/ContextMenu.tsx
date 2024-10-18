import React from 'react';
import styles from './ContextMenu.module.css'
import {Button} from "../Button/Button.tsx";

type ContextMenuProps = {
    position: { x: number; y: number } | null;
    onRemove: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ position,onRemove }) => {
    if (!position) return null;

    return (
        <div
           className={styles.contextMenu}
           style={{
               position: 'absolute',
               zIndex: 1000,
               top: position.y,
               left: position.x
           }}>
            <Button onClick={onRemove}>Remove</Button>
        </div>
    );
};