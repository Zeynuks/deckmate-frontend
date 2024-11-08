import { useEffect, useRef, useState, startTransition } from 'react';
import { useMousePosition } from './useMousePosition';

type UseDragProps = {
    position: { x: number; y: number };
    onDrag: (x: number, y: number) => void;
    onDragEnd: (x: number, y: number) => void;
    objectRef: React.RefObject<SVGGElement>;
};

export const useDrag = ({
                            position,
                            onDrag,
                            onDragEnd,
                            objectRef,
                        }: UseDragProps) => {
    const [, setPosition] = useState(position);
    const isDragging = useRef(false);
    const startMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const startPosition = useRef(position);
    const latestPositionRef = useRef(position);

    const { getMousePosition } = useMousePosition(objectRef);

    const handleDragMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isDragging.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startPosition.current = position;
        latestPositionRef.current = position;

        window.addEventListener('mousemove', handleDragMouseMove);
        window.addEventListener('mouseup', handleDragMouseUp);
    };

    const handleDragMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const mousePosition = getMousePosition(e);
        const deltaX = mousePosition.x - startMousePosition.current.x;
        const deltaY = mousePosition.y - startMousePosition.current.y;

        const newX = startPosition.current.x + deltaX;
        const newY = startPosition.current.y + deltaY;

        latestPositionRef.current = { x: newX, y: newY };

        startTransition(() => {
            setPosition({ x: newX, y: newY });
        });
        onDrag(newX, newY);
    };

    const handleDragMouseUp = () => {
        const { x, y } = latestPositionRef.current;
        onDragEnd(x, y);
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