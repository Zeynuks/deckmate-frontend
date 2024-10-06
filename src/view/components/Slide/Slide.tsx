// Slide.tsx

import React from 'react';
import { Slide as SlideType, ObjectType } from '../../../source/types';
import { TextObjectComponent } from '../TextObject/TextObject';
import { ImageObjectComponent } from '../ImageObject/ImageObject';

type SlideProps = {
    slide: SlideType;
    width: number;
    height: number;
    borderRadius: number;
    transform?: string;
};

export const Slide: React.FC<SlideProps> = ({ slide, width, height, borderRadius, transform = '' }) => {
    const { id, background, objects } = slide;
    const { type: backgroundType } = background;
    console.log(slide.objects)
    return (
        <g transform={transform}>
            <defs>
                <clipPath id={`clip-${id}`}>
                    <rect
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        rx={borderRadius}
                        ry={borderRadius}
                    />
                </clipPath>
            </defs>
            {backgroundType === 'color' && (
                <rect
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    fill={background.color}
                    rx={borderRadius}
                    ry={borderRadius}
                />
            )}

            {backgroundType === 'image' && (
                <>
                    <rect
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        fill="none"
                        rx={borderRadius}
                        ry={borderRadius}
                    />
                    <image
                        href={background.src}
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#clip-${id})`}
                    />
                </>
            )}

            {objects.map((obj) => {
                switch (obj.type) {
                    case ObjectType.Text:
                        return <TextObjectComponent key={obj.id} object={obj} />;
                    case ObjectType.Image:
                        return <ImageObjectComponent key={obj.id} object={obj} />;
                    default:
                        return null;
                }
            })}
        </g>
    );
};
