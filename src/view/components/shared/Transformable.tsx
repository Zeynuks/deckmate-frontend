import React, { useState, useRef } from 'react';

type TransformableProps = {
    children: React.ReactNode;
    initialX: number;
    initialY: number;
    initialRotate?: number;
    onDragEnd?: (newX: number, newY: number) => void;
    onRotateEnd?: (newRotate: number) => void;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                initialX,
                                                                initialY,
                                                                initialRotate = 0,
                                                                onDragEnd,
                                                                onRotateEnd,
                                                            }) => {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);
    const [rotate, setRotate] = useState(initialRotate);
    const isDragging = useRef(false);
    const startPosition = useRef({ x: 0, y: 0 });
    const isRotating = useRef(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.shiftKey) {
            isRotating.current = true;
        } else {
            isDragging.current = true;
            startPosition.current = {
                x: e.clientX - x,
                y: e.clientY - y,
            };
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) {
            setX(e.clientX - startPosition.current.x);
            setY(e.clientY - startPosition.current.y);
        }
        if (isRotating.current) {
            const centerX = x + 50; // Определить центр вращения (примерное значение)
            const centerY = y + 50;
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            setRotate(angle);
        }
    };

    const handleMouseUp = () => {
        if (isDragging.current) {
            isDragging.current = false;
            if (onDragEnd) onDragEnd(x, y);
        }
        if (isRotating.current) {
            isRotating.current = false;
            if (onRotateEnd) onRotateEnd(rotate);
        }
    };

    return (
        <g
            transform={`translate(${x} ${y}) rotate(${rotate})`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
            {children}
        </g>
    );
};
