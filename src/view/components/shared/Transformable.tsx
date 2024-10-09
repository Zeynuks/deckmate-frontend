import React, { useEffect, useRef, useState } from 'react';

type TransformableProps = {
    children: React.ReactNode;
    initialX: number;
    initialY: number;
    onView?: boolean;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                initialX,
                                                                initialY,
                                                                onView = false,
                                                            }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const startMousePosition = useRef({ x: 0, y: 0 });
    const startObjectPosition = useRef({ x: initialX, y: initialY });
    const transformableRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        setPosition({ x: initialX, y: initialY });
    }, [initialX, initialY]);

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

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!onView) return;
        e.preventDefault();
        setIsDragging(true);
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startObjectPosition.current = { ...position };
    };

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e: MouseEvent) => {
                const mousePosition = getMousePosition(e);
                const deltaX = mousePosition.x - startMousePosition.current.x;
                const deltaY = mousePosition.y - startMousePosition.current.y;

                setPosition({
                    x: startObjectPosition.current.x + deltaX,
                    y: startObjectPosition.current.y + deltaY,
                });
            };

            const handleMouseUp = () => {
                setIsDragging(false);
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    return (
        <g
            ref={transformableRef}
            transform={`translate(${position.x} ${position.y})`}
            onMouseDown={handleMouseDown}
            style={{ cursor: onView ? 'grab' : 'default' }}
        >
            {children}
        </g>
    );
};
