import React, {useRef, useEffect, useState, ReactNode} from 'react';
import {useDrag} from '../../../hooks/useDrag.ts';
import {useResize} from '../../../hooks/useResize.ts';
import {useRotate} from '../../../hooks/useRotate.ts';
import {useAppActions} from '../../../hooks/useAppActions.ts';
import {RootState, useAppSelector} from '../../../store/store.ts';

type TransformableProps = {
    children: (size: { width: number, height: number }, isEditing: boolean) => ReactNode;
    isHidden: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    angle: number;
    onClick?: () => void;
};

export const Transformable: React.FC<TransformableProps> = ({
                                                                children,
                                                                isHidden,
                                                                position,
                                                                size,
                                                                angle,
                                                                onClick,
                                                            }) => {
    const scale = useAppSelector((state: RootState) => state.data.scaleFactor);
    const {setObjectPosition, setObjectAngle, setObjectSize} = useAppActions();
    const objectRef = useRef<SVGGElement | null>(null);
    const [localPosition, setLocalPosition] = useState(position);
    const [localSize, setLocalSize] = useState(size);
    const [localRotation, setLocalRotation] = useState(angle);
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        setEditing(false);
    }, [children]);

    useEffect(() => {
        setLocalPosition(position);
    }, [position]);

    useEffect(() => {
        setLocalSize(size);
    }, [size]);

    useEffect(() => {
        setLocalRotation(angle);
    }, [angle]);

    const {handleDragMouseDown} = useDrag({
        position: localPosition,
        onDrag: (x, y) => {
            setLocalPosition({x, y});
        },
        onDragEnd: (x, y) => setObjectPosition(x, y),
        objectRef,
    });

    const {handleResizeMouseDown} = useResize({
        size: localSize,
        position: localPosition,
        onResize: (width, height) => {
            setLocalSize({width, height});
        },
        onResizeEnd: (width, height) => setObjectSize(width, height),
        onDrag: (x, y) => {
            setLocalPosition({x, y});
        },
        onDragEnd: (x, y) => setObjectPosition(x, y),
        objectRef,
        angle: localRotation,
    });

    const {handleRotateMouseDown} = useRotate({
        position: localPosition,
        angle: localRotation,
        onRotate: (angle) => {
            setLocalRotation(angle);
        },
        onRotateEnd: (angle) => setObjectAngle(angle),
        objectRef,
    });

    const resizeDirections = [
        {x: -1, y: -1, cursor: 'nw-resize'},
        {x: 0, y: -1, cursor: 'n-resize'},
        {x: 1, y: -1, cursor: 'ne-resize'},
        {x: 1, y: 0, cursor: 'e-resize'},
        {x: 1, y: 1, cursor: 'se-resize'},
        {x: 0, y: 1, cursor: 's-resize'},
        {x: -1, y: 1, cursor: 'sw-resize'},
        {x: -1, y: 0, cursor: 'w-resize'}
    ];

    return (
        <g
            ref={objectRef}
            transform={`translate(${localPosition.x} ${localPosition.y}) rotate(${localRotation})`}
        >
            {children(localSize, isEditing)}
            {!isEditing && <rect
                x={-localSize.width / 2}
                y={-localSize.height / 2}
                width={localSize.width}
                height={localSize.height}
                fill="transparent"
                onMouseDown={isHidden ? handleDragMouseDown : () => {
                }}
                style={{cursor: isHidden ? 'grab' : 'default'}}
                stroke={isHidden ? '#7B61FF' : ''}
                strokeWidth={isHidden ? `${4 / scale}px` : ''}
                onClick={onClick}
                onDoubleClick={isHidden? () => setEditing(true): () => {}}
            />}

            {isHidden && !isEditing && (
                <>
                    <line
                        x1={0}
                        y1={-localSize.height / 2}
                        x2={0}
                        y2={-localSize.height / 2 - 30 / scale}
                        stroke="#7B61FF"
                        strokeWidth={4 / scale}
                    />
                    <circle
                        cx={0}
                        cy={-localSize.height / 2 - 40 / scale}
                        r={10 / scale}
                        fill="#7B61FF"
                        onMouseDown={handleRotateMouseDown}
                        style={{cursor: 'crosshair'}}
                    />
                </>
            )}

            {isHidden && !isEditing &&
                resizeDirections.map((direction, index) => {
                    const markerX = (direction.x * localSize.width) / 2 - 10 / scale;
                    const markerY = (direction.y * localSize.height) / 2 - 10 / scale;

                    return (
                        <rect
                            key={index}
                            x={markerX}
                            y={markerY}
                            width={20 / scale}
                            height={20 / scale}
                            fill="#7B61FF"
                            rx={3}
                            ry={3}
                            onMouseDown={(e) => handleResizeMouseDown(e, direction)}
                            style={{cursor: direction.cursor}}
                        />
                    );
                })}
        </g>
    );
};
