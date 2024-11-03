import React, {useRef, useEffect, useState, ReactNode} from 'react';
import { useDrag } from '../../../hooks/useDrag';
import { useResize } from '../../../hooks/useResize';
import { useRotate } from '../../../hooks/useRotate';
import {dispatch} from "../../../store/editor.ts";
import {setObjectPos} from "../../../store/functions/setObjectPos.ts";
import {setObjectSize} from "../../../store/functions/setObjectSize.ts";
import {setObjectAngle} from "../../../store/functions/setObjectAngle.ts";

type TransformableProps = {
    children: (data: { width: number, height: number }) => ReactNode;
    hidden: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    angle: number;
    onClick?: () => void;
    onView?: boolean;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                hidden,
                                                                position,
                                                                size,
                                                                angle,
                                                                onClick,
                                                                onView = false,
                                                            }) => {
    console.log(position);
    const objectRef = useRef<SVGGElement | null>(null);
    const [localPosition, setLocalPosition] = useState(position);
    const [localSize, setLocalSize] = useState(size);
    const [localRotation, setLocalRotation] = useState(angle);

    useEffect(() => {
        setLocalPosition(position);
    }, [position]);

    useEffect(() => {
        setLocalSize(size);
    }, [size]);

    useEffect(() => {
        setLocalRotation(angle);
    }, [angle]);

    const { handleDragMouseDown } = useDrag({
        position: localPosition,
        onDrag: (x, y) => {
            setLocalPosition({ x, y });
        },
        onDragEnd: (x, y) => {
            dispatch(setObjectPos, { x, y });
        },
        objectRef,
    });

    const { handleResizeMouseDown } = useResize({
        size: localSize,
        position: localPosition,
        onResize: (width, height) => {
            setLocalSize({ width, height });
        },
        onResizeEnd: (width, height) => {
            dispatch(setObjectSize, { width, height });
        },
        onDrag: (x, y) => {
            setLocalPosition({ x, y });
        },
        onDragEnd: (x, y) => {
            dispatch(setObjectPos, { x, y });
        },
        objectRef,
        angle: localRotation,
    });

    const { handleRotateMouseDown } = useRotate({
        position: localPosition,
        angle: localRotation,
        onRotate: (angle) => {
            setLocalRotation(angle);
        },
        onRotateEnd: (angle) => {
            dispatch(setObjectAngle, angle);
        },
        objectRef,
    });

    const resizeDirections = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: 0 },
    ];

    const newOnClick = onClick || (() => {});

    return (
        <g
            ref={objectRef}
            transform={`translate(${localPosition.x} ${localPosition.y}) rotate(${localRotation})`}
        >
            {children(localSize)}
            <rect
                x={-localSize.width / 2}
                y={-localSize.height / 2}
                width={localSize.width}
                height={localSize.height}
                fill="transparent"
                onMouseDown={handleDragMouseDown}
                style={{ cursor: onView ? 'grab' : 'default'}}
                stroke={hidden ? '#7B61FF' : ''}
                strokeWidth={hidden ? '4px' : ''}
                onMouseDownCapture={newOnClick}
            />

            {onView && hidden && (
                <>
                    <line
                        x1={0}
                        y1={-localSize.height / 2}
                        x2={0}
                        y2={-localSize.height / 2 - 30}
                        stroke="#7B61FF"
                        strokeWidth={4}
                    />

                    <circle
                        cx={0}
                        cy={-localSize.height / 2 - 40}
                        r={10}
                        fill="#7B61FF"
                        onMouseDown={handleRotateMouseDown}
                        style={{ cursor: 'crosshair' }}
                    />
                </>
            )}

            {onView && hidden &&
                resizeDirections.map((direction, index) => {
                    const markerX = (direction.x * localSize.width) / 2 - 10;
                    const markerY = (direction.y * localSize.height) / 2 - 10;

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
                            style={{ cursor: cursorStyle }}
                        />
                    );
                })}
        </g>
    );
};
