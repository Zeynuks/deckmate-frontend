import { useState, useRef, useEffect, FormEvent } from 'react';
import { TextSpan } from '../store/types';

const useEditableContent = (initialContent: TextSpan[]) => {
    const [editedContent, setEditedContent] = useState<TextSpan[]>(initialContent);
    const [isEditing, setIsEditing] = useState(false);
    const cursorPositionRef = useRef<Range | null>(null);
    const contentEditableRef = useRef<HTMLDivElement>(null);

    const saveCursorPosition = (element: HTMLElement) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            cursorPositionRef.current = range.cloneRange();
        }
    };

    const restoreCursorPosition = () => {
        const selection = window.getSelection();
        const range = cursorPositionRef.current;
        if (selection && range) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const stopEditing = () => {
        setIsEditing(false);
    };

    const handleInput = (e: FormEvent<HTMLDivElement>) => {
        saveCursorPosition(e.currentTarget);
    };

    useEffect(() => {
        if (isEditing && contentEditableRef.current) {
            restoreCursorPosition();
        }
    }, [isEditing]);

    return {
        editedContent,
        isEditing,
        contentEditableRef,
        startEditing,
        stopEditing,
        handleInput,
        setEditedContent,
    };
};

export default useEditableContent;
