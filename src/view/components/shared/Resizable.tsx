import React, { useRef, useCallback } from 'react';

type ResizableProps = {
    children: React.ReactNode;
    width: number;
    height: number;
    onResize: (width: number, height: number) => void;
    onView?: boolean;
};

export const Resizable: React.FC<ResizableProps> = ({
                                                        children,
                                                        width,
                                                        height,
                                                        onResize,
                                                        onView = false,
                                                    }) => {
    const startDimensions = useRef({ width, height });
    const startMousePosition = useRef({ x: 0, y: 0 });
    const resizeDirection = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

    const handleMouseDown = (
        e: React.MouseEvent,
        direction: { x: number, y: number }
    ) => {
        if (!onView) return;
        e.preventDefault();
        startMousePosition.current = { x: e.clientX, y: e.clientY };
        startDimensions.current = { width, height };
        resizeDirection.current = direction;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const deltaX = e.clientX - startMousePosition.current.x;
        const deltaY = e.clientY - startMousePosition.current.y;
        const newWidth = startDimensions.current.width + deltaX * resizeDirection.current.x;
        const newHeight = startDimensions.current.height + deltaY * resizeDirection.current.y;

        onResize(Math.max(newWidth, 10), Math.max(newHeight, 10));
    }, [onResize]);

    const handleMouseUp = useCallback(() => {
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

    const pathData = `
        M0,0
        L${width},0
        L${width},${height}
        L0,${height}
        Z
    `; // Описание пути для обводки

    return (
        <g>
            {children}
            {/* Обводка */}
            <path
                d={pathData}
                fill="none"
                stroke="blue"
                strokeWidth={2}
                pointerEvents="none" // Чтобы избежать захвата событий мыши
            />
            {onView && resizeDirections.map((direction, index) => (
                <rect
                    key={index}
                    x={(direction.x + 1) * width / 2 - 5}
                    y={(direction.y + 1) * height / 2 - 5}
                    width={10}
                    height={10}
                    fill="blue"
                    onMouseDown={(e) => handleMouseDown(e, direction)}
                    style={{ cursor: `${index < 4 ? 'nesw' : 'nwse'}-resize` }}
                />
            ))}
        </g>
    );
};
