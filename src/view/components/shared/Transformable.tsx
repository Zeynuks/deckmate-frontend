// Transformable.tsx
import React, {useRef} from 'react';
import {useDrag} from '../../../hooks/useDrag';
import {useResize} from '../../../hooks/useResize';
import {useRotate} from '../../../hooks/useRotate';

type TransformableProps = {
    children: React.ReactNode;
    hidden: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    onResize: (width: number, height: number) => void;
    onDrag: (x: number, y: number) => void;
    onRotate: (angle: number) => void;
    rotation: number;
    onClick?: () => void;
    onView?: boolean;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                hidden,
                                                                position,
                                                                size,
                                                                onResize,
                                                                onDrag,
                                                                onRotate,
                                                                rotation,
                                                                onClick,
                                                                onView = false,
                                                            }) => {
    const transformableRef = useRef<SVGGElement | null>(null);

    // Initialize hooks
    const {handleDragMouseDown} = useDrag({
        position,
        onDrag,
        onView,
        transformableRef,
        rotation,
    });

    const {handleResizeMouseDown} = useResize({
        size,
        position,
        onResize,
        onDrag,
        onView,
        transformableRef,
        rotation,
    });

    const {handleRotateMouseDown} = useRotate({
        position,
        rotation,
        onRotate,
        onView,
        transformableRef,
    });

    const resizeDirections = [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: 1, y: -1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 1},
        {x: -1, y: 1},
        {x: -1, y: 0},
    ];
    const newOnClick = onClick || (() => {});
    return (
        <g
            ref={transformableRef}
            transform={`translate(${position.x} ${position.y}) rotate(${rotation})`}
        >
            <rect
                x={-size.width / 2}
                y={-size.height / 2}
                width={size.width}
                height={size.height}
                fill="transparent"
                onMouseDown={handleDragMouseDown}
                style={{cursor: onView ? 'grab' : 'default'}}
                stroke={hidden? "#7B61FF" : ''}
                strokeWidth={hidden? "4px" : ""}
                onMouseDownCapture = {newOnClick}
            />
            {children}
            {onView && hidden && (
                <>
                    <line
                        x1={0}
                        y1={-size.height / 2}
                        x2={0}
                        y2={-size.height / 2 - 30}
                        stroke="#7B61FF"
                        strokeWidth={2}
                        pointerEvents="none"
                    />

                    <circle
                        cx={0}
                        cy={-size.height / 2 - 40}
                        r={10}
                        fill="#7B61FF"
                        onMouseDown={handleRotateMouseDown}
                        style={{cursor: `crosshair`}}
                    />
                </>
            )}

            {onView && hidden &&
                resizeDirections.map((direction, index) => {
                    const markerX = (direction.x * size.width) / 2 - 10;
                    const markerY = (direction.y * size.height) / 2 - 10;

                    let cursorStyle = 'nwse-resize';
                    if (direction.x === 0 || direction.y === 0) {
                        cursorStyle = 'ns-resize';
                        if (direction.x !== 0) cursorStyle = 'ew-resize';
                    }

                    return (
                        <rect
                            key={index}
                            x={markerX}
                            y={markerY}
                            width={20}
                            height={20}
                            fill="#7B61FF"
                            rx={3}
                            ry={3}
                            onMouseDown={(e) => handleResizeMouseDown(e, direction)}
                            style={{cursor: cursorStyle}}
                        />
                    );
                })}
        </g>
    );
};
