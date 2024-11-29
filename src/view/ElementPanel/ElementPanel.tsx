import React from 'react';
import styles from './ElementPanel.module.css';
import {Button, IconPosition} from '../components/Button/Button.tsx';

import imageIcon from '../../assets/icons/gallery.svg';
import rectIcon from '../../assets/icons/rect.svg';
import ellipseIcon from '../../assets/icons/ellipse.svg';
import triangleIcon from '../../assets/icons/triangle.svg';
import textAreaIcon from '../../assets/icons/text-area.svg';
import {useToast} from '../components/Toast/ToastContext.tsx';
import {ImageObject, ObjectType} from '../../store/types.ts';
import {v4 as uuidv4} from 'uuid';
import {useAppActions} from '../../hooks/useAppActions.ts';
import convertImageToBase64 from '../../utils/convertBase64.ts';
import {RootState, useAppSelector} from '../../store/store.ts';

export const ElementPanel: React.FC = () => {
    const { addTextObject, addImageObject, setScaleFactor } = useAppActions();
    const scale = useAppSelector((state: RootState) => state.data.scaleFactor);
    const {addToast} = useToast();

    const handleFileUpload = (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            console.error('Выбранный файл не является изображением');
            addToast({
                title: 'Ошибка загрузки',
                description: 'Пожалуйста, выберите файл изображения',
                type: 'error',
            });
            return;
        }

        const img = new Image();
        convertImageToBase64(file)
            .then(base64 => {
                img.src = base64;
                document.getElementById('output')!.textContent = base64;
            })
            .catch(error => {
                console.error('Ошибка конвертации:', error);
            });
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            URL.revokeObjectURL(img.src);

            const newImageObject: ImageObject = {
                id: uuidv4(),
                type: ObjectType.Image,
                size: {
                    width: width,
                    height: height
                },
                position: {
                    x: 100,
                    y: 100
                },
                angle: 0,
                src: img.src
            };
            addImageObject(newImageObject);
        };

        img.onerror = () => {
            console.error('Ошибка при загрузке изображения');
            addToast({
                title: 'Ошибка загрузки',
                description: 'Ошибка при загрузке изображения',
                type: 'error',
            });
        };
    };

    return (
        <section className={styles.elementPanel}>
            <Button iconSrc={textAreaIcon} iconPosition={IconPosition.Top} onClick={() => addTextObject()}>Text</Button>
            <Button iconSrc={imageIcon} iconPosition={IconPosition.Top} isLoading onLoad={handleFileUpload}>Image</Button>
            <Button iconSrc={triangleIcon} iconPosition={IconPosition.Top} onClick={() => setScaleFactor(1)}>Triangle</Button>
            <Button iconSrc={ellipseIcon} iconPosition={IconPosition.Top} onClick={() => setScaleFactor(scale/2)}>Ellipse</Button>
            <Button iconSrc={rectIcon} iconPosition={IconPosition.Top}>Rect</Button>
        </section>
    );
};
