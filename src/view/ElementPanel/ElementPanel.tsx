import React, { useState } from 'react';
import styles from './ElementPanel.module.css';
import { Button, IconPosition } from '../components/Button/Button.tsx';
import imageIcon from '../../assets/icons/gallery.svg';
import rectIcon from '../../assets/icons/rect.svg';
import ellipseIcon from '../../assets/icons/ellipse.svg';
import triangleIcon from '../../assets/icons/triangle.svg';
import textAreaIcon from '../../assets/icons/text-area.svg';
import { useToast } from '../components/Toast/ToastContext.tsx';
import { ImageObject, ObjectType } from '../../store/types.ts';
import { v4 as uuidv4 } from 'uuid';
import { useAppActions } from '../../hooks/useAppActions.ts';
import convertImageToBase64 from '../../utils/convertBase64.ts';
import { RootState, useAppSelector } from '../../store/store.ts';
import ImageSearchModal from '../ImageSearchModal/ImageSearchModal';

export const ElementPanel: React.FC = () => {
    const { addTextObject, addImageObject, setScaleFactor, setSelected } = useAppActions();
    const scale = useAppSelector((state: RootState) => state.data.scaleFactor);
    const selected = useAppSelector((state: RootState) => state.selected);
    const { addToast } = useToast();
    const [isUnsplashModalOpen, setUnsplashModalOpen] = useState(false);

    const handleFileUpload = (file: File) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            addToast({
                title: 'Ошибка загрузки',
                description: 'Пожалуйста, выберите файл изображения',
                type: 'error',
            });
            return;
        }
        const img = new Image();
        convertImageToBase64(file)
            .then((base64) => {
                img.src = base64;
            })
            .catch((error) => {
                console.error('Ошибка конвертации:', error);
            });
        img.onload = () => {
            const { width, height } = img;
            URL.revokeObjectURL(img.src);
            const newImageObject: ImageObject = {
                id: uuidv4(),
                type: ObjectType.Image,
                size: { width, height },
                position: { x: 100, y: 100 },
                angle: 0,
                src: img.src,
            };
            addImageObject(newImageObject);
            setSelected(selected.slide, [newImageObject.id]);
        };
        img.onerror = () => {
            addToast({
                title: 'Ошибка загрузки',
                description: 'Ошибка при загрузке изображения',
                type: 'error',
            });
        };
    };

    const handleStockImageSelect = (fileBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const base64 = reader.result;
                const img = new Image();
                img.src = base64;
                img.onload = () => {
                    const { width, height } = img;
                    URL.revokeObjectURL(img.src);
                    const newImageObject: ImageObject = {
                        id: uuidv4(),
                        type: ObjectType.Image,
                        size: { width, height },
                        position: { x: 100, y: 100 },
                        angle: 0,
                        src: img.src,
                    };
                    addImageObject(newImageObject);
                    setSelected(selected.slide, [newImageObject.id]);
                    setUnsplashModalOpen(false);
                };
                img.onerror = () => {
                    addToast({
                        title: 'Ошибка загрузки',
                        description: 'Ошибка при загрузке stock image',
                        type: 'error',
                    });
                };
            }
        };
        reader.readAsDataURL(fileBlob);
    };

    return (
        <>
            <section className={styles.elementPanel}>
                <Button
                    iconSrc={textAreaIcon}
                    iconPosition={IconPosition.Top}
                    onClick={() => addTextObject()}
                >
                    Text
                </Button>
                <Button
                    iconSrc={imageIcon}
                    iconPosition={IconPosition.Top}
                    isLoading
                    onLoad={handleFileUpload}
                >
                    Image
                </Button>
                <Button
                    iconSrc={imageIcon}
                    iconPosition={IconPosition.Top}
                    onClick={() => setUnsplashModalOpen(true)}
                >
                    Stock image
                </Button>
                <Button
                    iconSrc={triangleIcon}
                    iconPosition={IconPosition.Top}
                    onClick={() => setScaleFactor(1)}
                >
                    Triangle
                </Button>
                <Button
                    iconSrc={ellipseIcon}
                    iconPosition={IconPosition.Top}
                    onClick={() => setScaleFactor(scale / 2)}
                >
                    Ellipse
                </Button>
                <Button
                    iconSrc={rectIcon}
                    iconPosition={IconPosition.Top}
                >
                    Rect
                </Button>
            </section>

            <ImageSearchModal
                isOpen={isUnsplashModalOpen}
                onClose={() => setUnsplashModalOpen(false)}
                onSelectImage={handleStockImageSelect}
            />
        </>
    );
};
