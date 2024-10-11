import { useRef, useEffect } from 'react';
import { useMousePosition } from './useMousePosition';

type UseDragProps = {
    position: { x: number; y: number };
    onDrag: (x: number, y: number) => void;
    onView: boolean;
    transformableRef: React.RefObject<SVGGElement>;
    rotation: number;
};

export const useDrag = ({
                            position,
                            onDrag,
                            onView,
                            transformableRef,
                        }: UseDragProps) => {
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

        onDrag(startPosition.current.x + deltaX, startPosition.current.y + deltaY);
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
