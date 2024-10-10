import React, {useRef} from 'react';

type TransformableProps = {
    children: React.ReactNode;
    position: { x: number, y: number }
    size: { width: number, height: number }
    onResize: (width: number, height: number) => void;
    onDrag: (x: number, y: number) => void;
    onRotate: (angle: number) => void;
    rotation: number;
    onView?: boolean;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                position,
                                                                size,
                                                                onResize,
                                                                onDrag,
                                                                onRotate,
                                                                rotation,
                                                                onView = false,
                                                            }) => {
    const startDimensions = useRef(size);
    const startPosition = useRef(position);
    const startMousePosition = useRef({x: 0, y: 0});
    const resizeDirection = useRef<{ x: number, y: number }>({x: 0, y: 0});
    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const isRotating = useRef(false);
    const startAngle = useRef(rotation);
    const center = useRef({x: 0, y: 0});
    const transformableRef = useRef<SVGGElement | null>(null);

    const getMousePosition = (e: MouseEvent | React.MouseEvent) => {
        const svg = transformableRef.current?.ownerSVGElement;
        if (!svg) return {x: e.clientX, y: e.clientY};
        const point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const ctm = svg.getScreenCTM()?.inverse();
        if (ctm) {
            const svgPoint = point.matrixTransform(ctm);
            return {x: svgPoint.x, y: svgPoint.y};
        }
        return {x: e.clientX, y: e.clientY};
    };


    const getMouseDelta = (e: MouseEvent | React.MouseEvent) => {
        const mousePosition = getMousePosition(e);
        return {
            deltaX: mousePosition.x - startMousePosition.current.x,
            deltaY: mousePosition.y - startMousePosition.current.y,
        };
    };


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

        const {deltaX, deltaY} = getMouseDelta(e);
        onDrag(startPosition.current.x + deltaX, startPosition.current.y + deltaY);
    };

    const handleDragMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', handleDragMouseMove);
        window.removeEventListener('mouseup', handleDragMouseUp);
    };


    const handleResizeMouseDown = (
        e: React.MouseEvent,
        direction: { x: number, y: number }
    ) => {
        if (!onView) return;
        e.preventDefault();
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
        const {deltaX, deltaY} = getMouseDelta(e);
        const newWidth =
            startDimensions.current.width + deltaX * resizeDirection.current.x;
        const newHeight =
            startDimensions.current.height + deltaY * resizeDirection.current.y;

        const { x: dirX, y: dirY } = resizeDirection.current;
        const { x: startX, y: startY } = startPosition.current;


        const newX = dirX < 0 ? startX - deltaX * dirX : startX;
        const newY = dirY < 0 ? startY - deltaY * dirY : startY;

        if (dirX < 0 || dirY < 0) {
            onDrag(newX, newY);
        }

        onResize(Math.max(newWidth, 10), Math.max(newHeight, 10));
    };

    const handleResizeMouseUp = () => {
        isResizing.current = false;
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
    };

    const handleRotateMouseDown = (e: React.MouseEvent) => {
        if (!onView) return;
        e.preventDefault();
        e.stopPropagation();
        isRotating.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startAngle.current = rotation;

        center.current = {
            x: position.x + size.width / 2,
            y: position.y + size.height / 2,
        };

        window.addEventListener('mousemove', handleRotateMouseMove);
        window.addEventListener('mouseup', handleRotateMouseUp);
    };

    const handleRotateMouseMove = (e: MouseEvent) => {
        if (!isRotating.current) return;

        const mousePosition = getMousePosition(e);
        const dx = mousePosition.x - center.current.x;
        const dy = mousePosition.y - center.current.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const startDx = startMousePosition.current.x - center.current.x;
        const startDy = startMousePosition.current.y - center.current.y;
        const startAngleRad = Math.atan2(startDy, startDx) * (180 / Math.PI);
        const deltaAngle = angle - startAngleRad;

        onRotate(startAngle.current + deltaAngle);
    };

    const handleRotateMouseUp = () => {
        isRotating.current = false;
        window.removeEventListener('mousemove', handleRotateMouseMove);
        window.removeEventListener('mouseup', handleRotateMouseUp);
    };

    const resizeDirections = [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: 1, y: -1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 1},
        {x: -1, y: 1},
        {x: -1, y: 0}
    ];

    return (
        <g
            ref={transformableRef}
            transform={`translate(${position.x + size.width / 2} ${position.y + size.height / 2}) rotate(${rotation}) translate(${-size.width / 2} ${-size.height / 2})`}
        >

            <rect
                x={0}
                y={0}
                width={size.width}
                height={size.height}
                fill="transparent"
                onMouseDown={handleDragMouseDown}
                style={{cursor: onView ? 'grab' : 'default'}}
                stroke="#7B61FF"
                strokeWidth={4}
            />
            {children}
            {onView && (
                <>

                    <line
                        x1={size.width / 2}
                        y1={0}
                        x2={size.width / 2}
                        y2={-30}
                        stroke="#7B61FF"
                        strokeWidth={2}
                        pointerEvents="none"
                    />

                    <circle
                        cx={size.width / 2}
                        cy={-40}
                        r={10}
                        fill="#7B61FF"
                        onMouseDown={handleRotateMouseDown}
                        style={{cursor: 'crosshair'}}
                    />
                </>
            )}

            {onView && resizeDirections.map((direction, index) => (
                <rect
                    key={index}
                    x={(direction.x + 1) * size.width / 2 - 10}
                    y={(direction.y + 1) * size.height / 2 - 10}
                    width={20}
                    height={20}
                    fill="#7B61FF"
                    rx={3}
                    ry={3}
                    onMouseDown={(e) => handleResizeMouseDown(e, direction)}
                    style={{cursor: `${index < 4 ? 'nesw' : 'nwse'}-resize`}}
                />
            ))}
        </g>
    );
};
