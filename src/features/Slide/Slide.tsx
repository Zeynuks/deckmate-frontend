import React, { useState } from 'react';
import { Slide as SlideType, ObjectType, Selected } from '../../source/types.ts';
import { TextObjectComponent } from './TextObject/TextObject.tsx';
import { ImageObjectComponent } from './ImageObject/ImageObject.tsx';
import { Transformable } from "../../view/components/shared/Transformable.tsx";

type SlideProps = {
    slide: SlideType;
    selected: Selected;
    borderRadius?: number;
    onView?: boolean;
};

export const Slide: React.FC<SlideProps> = ({ slide, selected, borderRadius = 0, onView = false }) => {
    const { background, objects } = slide;

    const viewObjects = objects.map((obj) => {
        const [width, setWidth] = useState(obj.size.width);
        const [height, setHeight] = useState(obj.size.height);
        const [x, setX] = useState(obj.position.x);
        const [y, setY] = useState(obj.position.y);
        const isSelected = selected && selected.objectId && selected.objectId.includes(obj.id);

        if (isSelected) {
            return (
                <Transformable
                    key={obj.id}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    onResize={(newWidth, newHeight) => {
                        setWidth(newWidth);
                        setHeight(newHeight);
                    }}
                    onDrag={(newX, newY) => {
                        setX(newX);
                        setY(newY);
                    }}
                    onView={onView}
                >
                    {obj.type === ObjectType.Text ? (
                        <TextObjectComponent width={width} height={height} slideObject={obj} onView={onView} />
                    ) : (
                        <ImageObjectComponent width={width} height={height} slideObject={obj} onView={onView} />
                    )}
                </Transformable>
            );
        } else {
            return (
                <g key={obj.id} transform={`translate(${x} ${y})`}>
                    {obj.type === ObjectType.Text ? (
                        <TextObjectComponent width={width} height={height} slideObject={obj} onView={onView} />
                    ) : (
                        <ImageObjectComponent width={width} height={height} slideObject={obj} onView={onView} />
                    )}
                </g>
            );
        }
    });

    return (
        <g>
            {background.type === 'color' && (
                <rect
                    x={0}
                    y={0}
                    width={1920}
                    height={1080}
                    fill={background.color}
                    rx={borderRadius}
                    ry={borderRadius}
                />
            )}
            {background.type === 'image' && (
                <image
                    href={background.src}
                    x={0}
                    y={0}
                    width={1920}
                    height={1080}
                    preserveAspectRatio="xMidYMid slice"
                />
            )}
            {viewObjects}
        </g>
    );
};
