import React, { useState, useRef, useCallback } from 'react';

type TransformableProps = {
    children: React.ReactNode;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    initialRotate?: number;
    onView?: boolean;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                initialX,
                                                                initialY,
                                                                initialWidth,
                                                                initialHeight,
                                                                initialRotate = 0,
                                                                onView = false,
                                                            }) => {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [rotate, setRotate] = useState(initialRotate);

    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const isRotating = useRef(false);
    const resizeDirection = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const startMousePosition = useRef({ x: 0, y: 0 });
    const startObjectPosition = useRef({ x: initialX, y: initialY });
    const startDimensions = useRef({ width: initialWidth, height: initialHeight });

    const handleMouseDown = (e: React.MouseEvent, type?: 'drag' | 'resize' | 'rotate', direction?: { x: number; y: number }) => {
        if (onView) {
            e.preventDefault();
            startMousePosition.current = { x: e.clientX, y: e.clientY };
            startObjectPosition.current = { x, y };
            startDimensions.current = { width, height };

            if (type === 'resize' && direction) {
                isResizing.current = true;
                resizeDirection.current = direction;
            } else if (type === 'rotate') {
                isRotating.current = true;
            } else {
                isDragging.current = true;
            }

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (onView) {
            const deltaX = e.clientX - startMousePosition.current.x;
            const deltaY = e.clientY - startMousePosition.current.y;

            if (isDragging.current && !isRotating.current) {
                setX(startObjectPosition.current.x + deltaX);
                setY(startObjectPosition.current.y + deltaY);
            }

            if (isResizing.current) {
                const newWidth = startDimensions.current.width + deltaX * resizeDirection.current.x;
                const newHeight = startDimensions.current.height + deltaY * resizeDirection.current.y;
                setWidth(Math.max(newWidth, 10));
                setHeight(Math.max(newHeight, 10));
            }

            if (isRotating.current) {
                const centerX = x + width / 2;
                const centerY = y + height / 2;
                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                setRotate(angle);
            }
        }
    }, [x, y, width, height, onView]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        isResizing.current = false;
        isRotating.current = false;

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const resizeDirections = [
        { x: -1, y: -1 }, // Top-left
        { x: 0, y: -1 },  // Top-center
        { x: 1, y: -1 },  // Top-right
        { x: 1, y: 0 },   // Right-center
        { x: 1, y: 1 },   // Bottom-right
        { x: 0, y: 1 },   // Bottom-center
        { x: -1, y: 1 },  // Bottom-left
        { x: -1, y: 0 },  // Left-center
    ];

    return (
        <g
            transform={`translate(${x} ${y}) rotate(${rotate} ${width / 2} ${height / 2})`}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
            {children}
            {onView && (
                <>
                    {resizeDirections.map((direction, index) => (
                        <rect
                            key={index}
                            x={(direction.x + 1) * width / 2 - 5}
                            y={(direction.y + 1) * height / 2 - 5}
                            width={10}
                            height={10}
                            fill="blue"
                            onMouseDown={(e) => handleMouseDown(e, 'resize', direction)}
                            style={{ cursor: `${index < 4 ? 'nesw' : 'nwse'}-resize` }}
                        />
                    ))}
                    <circle
                        cx={width / 2}
                        cy={-20}
                        r={5}
                        fill="red"
                        onMouseDown={(e) => handleMouseDown(e, 'rotate')}
                        style={{ cursor: 'pointer' }}
                    />
                </>
            )}
        </g>
    );
};
