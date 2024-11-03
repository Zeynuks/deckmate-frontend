import React from 'react';
import styles from './ElementPanel.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button.tsx';

import {dispatch} from '../../store/editor.ts';
import {addTextObject} from '../../store/functions/addTextObject.ts';
import {addImageObject} from '../../store/functions/addImageObject.ts';

import imageIcon from '../../assets/icons/gallery.svg';
import rectIcon from '../../assets/icons/rect.svg';
import ellipseIcon from '../../assets/icons/ellipse.svg';
import triangleIcon from '../../assets/icons/triangle.svg';
import textAreaIcon from '../../assets/icons/text-area.svg';

export const ElementPanel: React.FC = () => {
    return (
        <section className={styles.elementPanel}>
            <Button iconSrc={textAreaIcon} iconPosition={IconPosition.Top}  onClick={() => dispatch(addTextObject)}>Text</Button>
            <Button iconSrc={imageIcon} iconPosition={IconPosition.Top}  onClick={() => dispatch(addImageObject)}>Image</Button>
            <Button iconSrc={triangleIcon} iconPosition={IconPosition.Top}  onClick={() => {}}>Triangle</Button>
            <Button iconSrc={ellipseIcon} iconPosition={IconPosition.Top}  onClick={() => {}}>Ellipse</Button>
            <Button iconSrc={rectIcon} iconPosition={IconPosition.Top}  onClick={() => {}}>Rect</Button>
        </section>
    );
};
