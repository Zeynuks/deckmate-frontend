import { FC, useState } from 'react';
import ColorPicker from '../components/ColorPicker/ColorPicker';
import styles from './ToolPanel.module.css';
import { Select, SelectOption } from '../components/Select/Select';
import { RootState, useAppSelector } from '../../store/store.ts';
import { Button } from '../components/Button/Button.tsx';
import boldIcon from '../../assets/icons/Blod.svg';
import italicIcon from '../../assets/icons/Italic.svg';
import underlineIcon from '../../assets/icons/Underline.svg';
import leftIcon from '../../assets/icons/Left.svg';
import middleIcon from '../../assets/icons/Center.svg';
import rightIcon from '../../assets/icons/Right.svg';
import fillIcon from '../../assets/icons/Fill.svg';
import slideLoadIcon from '../../assets/icons/slideLoad.svg';
import backgroundFillIcon from '../../assets/icons/BackgroundFill.svg';
import convertImageToBase64 from '../../utils/convertBase64.ts';
import {Background, BackgroundType, CSSColor} from '../../store/types.ts';
import {useToast} from '../components/Toast/ToastContext.tsx';
import {useAppActions} from '../../hooks/useAppActions.ts';

function saveSelection(): Range | null {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        return selection.getRangeAt(0).cloneRange();
    }
    return null;
}

function restoreSelection(savedRange: Range | null) {
    if (!savedRange) return;
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(savedRange);
}

function applyManualFontSize(fontSize: number) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;
    const extracted = range.extractContents();
    const span = document.createElement('span');
    span.style.fontSize = `${fontSize}px`;
    span.appendChild(extracted);
    range.insertNode(span);
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNode(span);
    selection.addRange(newRange);
}

export const ToolPanel: FC = () => {
    const { addToast } = useToast();
    const { setSlideBackground } = useAppActions();
    const selected = useAppSelector((state: RootState) => state.selected);

    const fontOptions: SelectOption[] = [
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Nunito', value: 'Nunito, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Courier New', value: '"Courier New", monospace' },
        { label: 'Times New Roman', value: '"Times New Roman", serif' },
    ];

    const fontSizeOptions: SelectOption[] = [
        { label: '4 px', value: 4 },
        { label: '6 px', value: 6 },
        { label: '8 px', value: 8 },
        { label: '10 px', value: 10 },
        { label: '12 px', value: 12 },
        { label: '14 px', value: 14 },
        { label: '16 px', value: 16 },
        { label: '18 px', value: 18 },
        { label: '24 px', value: 24 },
        { label: '36 px', value: 36 },
        { label: '48 px', value: 48 },
        { label: '56 px', value: 56 },
        { label: '72 px', value: 72 },
        { label: '96 px', value: 96 },
    ];

    const [currentFont, setCurrentFont] = useState<SelectOption>(fontOptions[0]);
    const [currentFontSize, setCurrentFontSize] = useState<SelectOption>(fontSizeOptions[2]);

    const focusAndRestore = () => {
        const savedRange = saveSelection();
        const editableEl = document.getElementById(selected.objects[0]);
        if (!editableEl) return { element: null, savedRange: null };
        editableEl.focus();
        return { element: editableEl, savedRange };
    };

    const finalizeRange = (savedRange: Range | null) => {
        if (savedRange) restoreSelection(savedRange);
    };

    const handleColorChange = (color: string) => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('foreColor', false, color);
    };

    const handleBackgoundColorChange = (color: string) => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('backColor', false, color);
    };

    const handleFontChange = (option: SelectOption | undefined) => {
        if (!option) return;
        setCurrentFont(option);
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            document.execCommand('styleWithCSS', false, 'true');
            document.execCommand('fontName', false, option.value as string);
        }
    };

    const handleFontSizeChange = (option: SelectOption | undefined) => {
        if (!option) return;
        setCurrentFontSize(option);
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        applyManualFontSize(option.value as number);
    };

    const applyBold = () => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('bold', false);
    };

    const applyItalic = () => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('italic', false);
    };

    const applyUnderline = () => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('underline', false);
    };

    const applyLeft = () => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('justifyLeft', false);
    };

    const applyMiddle = () => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('justifyCenter', false);
    };

    const applyRight = () => {
        const { element, savedRange } = focusAndRestore();
        if (!element) return;
        finalizeRange(savedRange);
        document.execCommand('styleWithCSS', false, 'true');
        document.execCommand('justifyRight', false);
    };

    const handleSetSlideImageBackground = (file: File) => {
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
            URL.revokeObjectURL(img.src);

            const imageBackgound: Background = {
                type: BackgroundType.Image,
                src: img.src
            };
            setSlideBackground(imageBackgound);
        };
        img.onerror = () => {
            addToast({
                title: 'Ошибка загрузки',
                description: 'Ошибка при загрузке изображения',
                type: 'error',
            });
        };
    };

    const handleSetSlideColorBackground = (color: string) => {
        const imageBackgound: Background = {
            type: BackgroundType.Color,
            color: color as CSSColor
        };
        setSlideBackground(imageBackgound);
    };

    return (
        <div className={styles.toolPanel}>
            <Select
                options={fontOptions}
                onChange={handleFontChange}
                value={currentFont}
            />
            <Select
                options={fontSizeOptions}
                onChange={handleFontSizeChange}
                value={currentFontSize}
            />
            <div className={styles.toolbarInner}>
                <Button
                    iconSrc={boldIcon}
                    className={styles.tollbarButton}
                    onClick={applyBold}
                />
                <Button
                    iconSrc={italicIcon}
                    className={styles.tollbarButton}
                    onClick={applyItalic}
                />
                <Button
                    iconSrc={underlineIcon}
                    className={styles.tollbarButton}
                    onClick={applyUnderline}
                />
            </div>
            <div className={styles.toolbarInner}>
                <Button
                    iconSrc={leftIcon}
                    className={styles.tollbarButton}
                    onClick={applyLeft}
                />
                <Button
                    iconSrc={middleIcon}
                    className={styles.tollbarButton}
                    onClick={applyMiddle}
                />
                <Button
                    iconSrc={rightIcon}
                    className={styles.tollbarButton}
                    onClick={applyRight}
                />
            </div>
            <div className={styles.toolbarInner}>
                <ColorPicker srcIcon={fillIcon} onColorSelect={handleColorChange}/>
                <ColorPicker srcIcon={backgroundFillIcon} onColorSelect={handleBackgoundColorChange}/>
            </div>
            <line style={{width: '100%'}}></line>
            <div className={styles.toolbarInner}>
                <Button
                    iconSrc={slideLoadIcon}
                    className={styles.tollbarButton}
                    isLoading
                    onLoad={handleSetSlideImageBackground}
                />
                <ColorPicker srcIcon={backgroundFillIcon} onColorSelect={handleSetSlideColorBackground}/>
            </div>
        </div>
    );
};