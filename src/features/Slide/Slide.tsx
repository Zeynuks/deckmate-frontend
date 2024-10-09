import React from 'react';
import { Slide as SlideType, ObjectType } from '../../source/types.ts';
import { TextObjectComponent } from './TextObject/TextObject.tsx';
import { ImageObjectComponent } from './ImageObject/ImageObject.tsx';

type SlideProps = {
    slide: SlideType;
    borderRadius?: number;
};

export const Slide: React.FC<SlideProps> = ({ slide, borderRadius = 0 }) => {
    const { background, objects } = slide;

    const viewObjects = objects.map((obj) => {
        switch (obj.type) {
            case ObjectType.Text:
                return <TextObjectComponent key={obj.id} object={obj} />;
            case ObjectType.Image:
                return <ImageObjectComponent key={obj.id} object={obj} />;
            default:
                return null;
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
