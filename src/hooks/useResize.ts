import {useRef, useEffect, startTransition, useState} from 'react';
import {useMousePosition} from './useMousePosition';

type UseResizeProps = {
    size: { width: number; height: number };
    position: { x: number; y: number };
    angle: number;
    onResize: (width: number, height: number) => void;
    onResizeEnd: (width: number, height: number) => void;
    onDrag: (x: number, y: number) => void;
    onDragEnd: (x: number, y: number) => void;
    objectRef: React.RefObject<SVGGElement>;
};

export const useResize = ({
                              size,
                              position,
                              angle,
                              onResize,
                              onResizeEnd,
                              onDrag,
                              onDragEnd,
                              objectRef
                          }: UseResizeProps) => {
    const [, setPosition] = useState(position);
    const [, setSize] = useState(size);
    const isResizing = useRef(false);
    const startMousePosition = useRef<{ x: number; y: number }>({x: 0, y: 0});
    const startDimensions = useRef(size);
    const startPosition = useRef(position);
    const resizeDirection = useRef<{ x: number; y: number }>({x: 0, y: 0});
    const latestPositionRef = useRef(position);
    const latestSizeRef = useRef(size);

    const {getMousePosition} = useMousePosition(objectRef);

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

    const handleResizeMouseDown = (e: React.MouseEvent, direction: { x: number; y: number }) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startDimensions.current = size;
        startPosition.current = position;
        resizeDirection.current = direction;
        latestPositionRef.current = position;

        window.addEventListener('mousemove', handleResizeMouseMove);
        window.addEventListener('mouseup', handleResizeMouseUp);
    };

    const handleResizeMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const mousePosition = getMousePosition(e);
        const deltaX = mousePosition.x - startMousePosition.current.x;
        const deltaY = mousePosition.y - startMousePosition.current.y;

        const localDelta = rotatePoint(deltaX, deltaY, -angle);

        let deltaWidth = localDelta.x * resizeDirection.current.x;
        let deltaHeight = localDelta.y * resizeDirection.current.y;

        if (e.shiftKey) {
            const aspectRatio = startDimensions.current.width / startDimensions.current.height;

            if (Math.abs(deltaWidth) > Math.abs(deltaHeight)) {
                deltaHeight = deltaWidth / aspectRatio;
            } else {
                deltaWidth = deltaHeight * aspectRatio;
            }
        }

        const newWidth = startDimensions.current.width + deltaWidth;
        const newHeight = startDimensions.current.height + deltaHeight;

        const width = Math.max(newWidth, 10);
        const height = Math.max(newHeight, 10);

        const changeWidth = width - startDimensions.current.width;
        const changeHeight = height - startDimensions.current.height;

        const shiftX = resizeDirection.current.x === -1 ? -changeWidth / 2 : changeWidth / 2;
        const shiftY = resizeDirection.current.y === -1 ? -changeHeight / 2 : changeHeight / 2;

        const rotatedShift = rotatePoint(shiftX, shiftY, angle);

        const newX = startPosition.current.x + rotatedShift.x;
        const newY = startPosition.current.y + rotatedShift.y;

        latestPositionRef.current = {x: newX, y: newY};
        latestSizeRef.current = {width: width, height: height};

        startTransition(() => {
            setPosition({x: newX, y: newY});
            setSize({height: height, width: width});
        });
        onDrag(newX, newY);
        onResize(width, height);
    };

    const handleResizeMouseUp = () => {
        const {x, y} = latestPositionRef.current;
        const {width, height} = latestSizeRef.current;
        isResizing.current = false;
        onDragEnd(x, y);
        onResizeEnd(width, height);
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleResizeMouseMove);
            window.removeEventListener('mouseup', handleResizeMouseUp);
        };
    }, []);

    return {handleResizeMouseDown};
};
