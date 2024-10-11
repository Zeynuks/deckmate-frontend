// useResize.ts
import { useRef, useEffect } from 'react';
import { useMousePosition } from './useMousePosition';

type UseResizeProps = {
    size: { width: number; height: number };
    position: { x: number; y: number };
    onResize: (width: number, height: number) => void;
    onDrag: (x: number, y: number) => void;
    onView: boolean;
    transformableRef: React.RefObject<SVGGElement>;
    rotation: number;
};

type Direction = { x: number; y: number };

export const useResize = ({
                              size,
                              position,
                              onResize,
                              onDrag,
                              onView,
                              transformableRef,
                              rotation,
                          }: UseResizeProps) => {
    const isResizing = useRef(false);
    const startMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const startDimensions = useRef(size);
    const startPosition = useRef(position);
    const resizeDirection = useRef<Direction>({ x: 0, y: 0 });

    const { getMousePosition } = useMousePosition(transformableRef);

    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const rotatePoint = (x: number, y: number, angle: number) => {
        const rad = toRadians(angle);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return {
            x: x * cos - y * sin,
            y: x * sin + y * cos,
        };
    };

    const handleResizeMouseDown = (
        e: React.MouseEvent,
        direction: Direction
    ) => {
        if (!onView) return;
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startDimensions.current = size;
        startPosition.current = position;
        resizeDirection.current = direction;

        window.addEventListener('mousemove', handleResizeMouseMove);
        window.addEventListener('mouseup', handleResizeMouseUp);
    };

    const handleResizeMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const mousePosition = getMousePosition(e);
        const deltaX = mousePosition.x - startMousePosition.current.x;
        const deltaY = mousePosition.y - startMousePosition.current.y;

        const localDelta = rotatePoint(deltaX, deltaY, -rotation);

        const deltaWidth = localDelta.x * resizeDirection.current.x;
        const deltaHeight = localDelta.y * resizeDirection.current.y;

        const newWidth = startDimensions.current.width + deltaWidth;
        const newHeight = startDimensions.current.height + deltaHeight;

        const finalWidth = Math.max(newWidth, 10);
        const finalHeight = Math.max(newHeight, 10);

        const changeWidth = finalWidth - startDimensions.current.width;
        const changeHeight = finalHeight - startDimensions.current.height;

        const shiftX = resizeDirection.current.x === -1 ? -changeWidth / 2 : changeWidth / 2;
        const shiftY = resizeDirection.current.y === -1 ? -changeHeight / 2 : changeHeight / 2;

        const rotatedShift = rotatePoint(shiftX, shiftY, rotation);

        const newX = startPosition.current.x + rotatedShift.x;
        const newY = startPosition.current.y + rotatedShift.y;

        onDrag(newX, newY);
        onResize(finalWidth, finalHeight);
    };

    const handleResizeMouseUp = () => {
        isResizing.current = false;
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleResizeMouseMove);
            window.removeEventListener('mouseup', handleResizeMouseUp);
        };
    }, []);

    return { handleResizeMouseDown };
};
