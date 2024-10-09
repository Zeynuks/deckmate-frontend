import React, { useRef } from 'react';

type TransformableProps = {
    children: React.ReactNode;
    x: number;
    y: number;
    width: number;
    height: number;
    onResize: (width: number, height: number) => void;
    onDrag: (x: number, y: number) => void;
    onView?: boolean;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                x,
                                                                y,
                                                                width,
                                                                height,
                                                                onResize,
                                                                onDrag,
                                                                onView = false,
                                                            }) => {
    const startDimensions = useRef({ width, height });
    const startPosition = useRef({ x, y });
    const startMousePosition = useRef({ x: 0, y: 0 });
    const resizeDirection = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const transformableRef = useRef<SVGGElement | null>(null);

    const getMousePosition = (e: MouseEvent | React.MouseEvent) => {
        const svg = transformableRef.current?.ownerSVGElement;
        if (!svg) return { x: e.clientX, y: e.clientY };
        const point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const ctm = svg.getScreenCTM()?.inverse();
        if (ctm) {
            const svgPoint = point.matrixTransform(ctm);
            return { x: svgPoint.x, y: svgPoint.y };
        }
        return { x: e.clientX, y: e.clientY };
    };

    // Логика перемещения
    const handleDragMouseDown = (e: React.MouseEvent) => {
        if (!onView) return;
        e.preventDefault();
        isDragging.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startPosition.current = { x, y };

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

    // Логика изменения размера
    const handleResizeMouseDown = (
        e: React.MouseEvent,
        direction: { x: number, y: number }
    ) => {
        if (!onView) return;
        e.preventDefault();
        isResizing.current = true;
        startMousePosition.current = { x: e.clientX, y: e.clientY };
        startDimensions.current = { width, height };
        resizeDirection.current = direction;

        window.addEventListener('mousemove', handleResizeMouseMove);
        window.addEventListener('mouseup', handleResizeMouseUp);
    };

    const handleResizeMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const deltaX = e.clientX - startMousePosition.current.x;
        const deltaY = e.clientY - startMousePosition.current.y;
        const newWidth = startDimensions.current.width + deltaX * resizeDirection.current.x;
        const newHeight = startDimensions.current.height + deltaY * resizeDirection.current.y;

        onResize(Math.max(newWidth, 10), Math.max(newHeight, 10));
    };

    const handleResizeMouseUp = () => {
        isResizing.current = false;
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
    };

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
    `;

    return (
        <g
            ref={transformableRef}
            transform={`translate(${x} ${y})`}
        >
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="transparent"
                pointerEvents='visible'
                onMouseDown={handleDragMouseDown}
                style={{ cursor: onView ? 'grab' : 'default' }}
            />
            {children}
            <path
                d={pathData}
                fill="none"
                stroke="blue"
                strokeWidth={2}
                pointerEvents="none"
            />
            {onView && resizeDirections.map((direction, index) => (
                <rect
                    key={index}
                    x={(direction.x + 1) * width / 2 - 5}
                    y={(direction.y + 1) * height / 2 - 5}
                    width={10}
                    height={10}
                    fill="blue"
                    onMouseDown={(e) => handleResizeMouseDown(e, direction)}
                    style={{ cursor: `${index < 4 ? 'nesw' : 'nwse'}-resize` }}
                />
            ))}
        </g>
    );
};
