import React from 'react';
import styles from './ElementPanel.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button.tsx';

import { useDispatch } from 'react-redux';

import imageIcon from '../../assets/icons/gallery.svg';
import rectIcon from '../../assets/icons/rect.svg';
import ellipseIcon from '../../assets/icons/ellipse.svg';
import triangleIcon from '../../assets/icons/triangle.svg';
import textAreaIcon from '../../assets/icons/text-area.svg';
import {ActionTypes} from "../../store/actionTypes.ts";

export const ElementPanel: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <section className={styles.elementPanel}>
            <Button iconSrc={textAreaIcon} iconPosition={IconPosition.Top}  onClick={() =>
                dispatch({type: ActionTypes.ADD_TEXT_OBJECT})}>Text</Button>
            <Button iconSrc={imageIcon} iconPosition={IconPosition.Top}  onClick={() =>
                dispatch({type: ActionTypes.ADD_TEXT_OBJECT})}>Image</Button>
            <Button iconSrc={triangleIcon} iconPosition={IconPosition.Top}  onClick={() => {}}>Triangle</Button>
            <Button iconSrc={ellipseIcon} iconPosition={IconPosition.Top}  onClick={() => {}}>Ellipse</Button>
            <Button iconSrc={rectIcon} iconPosition={IconPosition.Top}  onClick={() => {}}>Rect</Button>
        </section>
    );
};
