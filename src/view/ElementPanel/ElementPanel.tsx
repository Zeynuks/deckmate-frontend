import React, { useState } from 'react';
import styles from './ElementPanel.module.css';
import { Button, IconPosition } from '../components/Button/Button.tsx';
import imageIcon from '../../assets/icons/gallery.svg';
import ellipseIcon from '../../assets/icons/scaleDown.svg';
import triangleIcon from '../../assets/icons/scaleUp.svg';
import textAreaIcon from '../../assets/icons/text-area.svg';
import { useToast } from '../components/Toast/ToastContext.tsx';
import {
    FontStyle,
    FontWeight,
    ImageObject,
    ObjectType,
    TextHorizontalAlign,
    TextObject,
    TextVerticalAlign
} from '../../store/types.ts';
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

    const addText = () => {
        const newTextObject: TextObject =  {
            id: uuidv4(),
            type: ObjectType.Text,
            size: {width: 400, height: 100},
            position: {x: 800, y: 700},
            angle: 0,
            verticalAlign: TextVerticalAlign.Middle,
            lines: [
                {
                    id: uuidv4(),
                    horizontalAlign: TextHorizontalAlign.Left,
                    spans: [
                        {
                            id: uuidv4(),
                            text: 'Text template',
                            style: {
                                fontSize: 20,
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: FontWeight.W400,
                                fontStyle: FontStyle.Normal,
                                underline: false,
                                overline: false,
                                color: '#1ABC9C',
                                backgroundColor: 'none',
                            },
                        }
                    ],
                },
            ],
        };

        addTextObject(newTextObject);
    };

    return (
        <>
            <section className={styles.elementPanel}>
                <Button
                    iconSrc={textAreaIcon}
                    iconPosition={IconPosition.Top}
                    onClick={() => addText()}
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
               <div style={{width: '96px', display: 'flex', flexDirection: 'column'}}>
                   <Button
                       iconSrc={triangleIcon}
                       iconPosition={IconPosition.Top}
                       onClick={() => setScaleFactor(1)}
                   >
                   </Button>
                   <Button
                       iconSrc={ellipseIcon}
                       iconPosition={IconPosition.Top}
                       onClick={() => setScaleFactor(scale / 2)}
                   >
                   </Button>
               </div>
            </section>

            <ImageSearchModal
                isOpen={isUnsplashModalOpen}
                onClose={() => setUnsplashModalOpen(false)}
                onSelectImage={handleStockImageSelect}
            />
        </>
    );
};
