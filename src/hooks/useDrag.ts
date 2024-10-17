import {useEffect, useRef, useState} from 'react';
import { useMousePosition } from './useMousePosition';

type UseDragProps = {
    position: { x: number; y: number };
    onDrag: (x: number, y: number) => void;
    onView: boolean;
    transformableRef: React.RefObject<SVGGElement>;
};

export const useDrag = ({
                            position,
                            onDrag,
                            onView,
                            transformableRef,
                        }: UseDragProps) => {
    const [, setPosition] = useState(position);
    const isDragging = useRef(false);
    const startMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const startPosition = useRef(position);

    const { getMousePosition } = useMousePosition(transformableRef);

    const handleDragMouseDown = (e: React.MouseEvent) => {
        if (!onView) return;
        e.preventDefault();
        isDragging.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startPosition.current = position;
        window.addEventListener('mousemove', handleDragMouseMove);
        window.addEventListener('mouseup', handleDragMouseUp);
    };

    const handleDragMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const mousePosition = getMousePosition(e);
        const deltaX = mousePosition.x - startMousePosition.current.x;
        const deltaY = mousePosition.y - startMousePosition.current.y;

        let newX = startPosition.current.x + deltaX;
        let newY = startPosition.current.y + deltaY;

        const slideWidth = 1920;  // Предположительный размер слайда
        const slideHeight = 1080; // Предположительный размер слайда

        const centerX = slideWidth / 2;
        const centerY = slideHeight / 2;

        const snapDistance = 50; // Расстояние для привязки

        if (e.shiftKey) {
            // Привязка к центру по ширине
            if (Math.abs(newX - centerX) < snapDistance) {
                newX = centerX;
            }

            // Привязка к центру по высоте
            if (Math.abs(newY - centerY) < snapDistance) {
                newY = centerY;
            }
        }

        setPosition({ x: newX, y: newY });
        onDrag(newX, newY);
    };

    const handleDragMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', handleDragMouseMove);
        window.removeEventListener('mouseup', handleDragMouseUp);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleDragMouseMove);
            window.removeEventListener('mouseup', handleDragMouseUp);
        };
    }, []);

    return { handleDragMouseDown };
};