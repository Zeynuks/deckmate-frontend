// Slide.tsx

import React from 'react';
import {Slide as SlideType, ObjectType} from '../../../source/types';
import {TextObjectComponent} from '../TextObject/TextObject';
import {ImageObjectComponent} from '../ImageObject/ImageObject';

type SlideProps = {
    slide: SlideType;
    width: number;
    height: number;
    borderRadius: number;
    transform?: string;
    isView?: boolean
};

export const Slide: React.FC<SlideProps> = ({
                                                slide,
                                                width,
                                                height,
                                                borderRadius,
                                                transform = '',
                                                isView = false
                                            }) => {
    const {
        id,
        background,
        objects
    } = slide;
    const {type: backgroundType} = background;
    console.log(slide.objects);

    const viewObjects = objects.map((obj) => {
        switch (obj.type) {
            case ObjectType.Text:
                return <>
                    <path fill="#000" fill-opacity="0" stroke="#000" stroke-opacity="0"
                          stroke-width="100" stroke-linecap="round" stroke-linejoin="round"
                          stroke-miterlimit="10" pointer-events="visiblePainted"
                          d="M 100 100 L 100 100 100 100 100 100 Z"></path>
                    <TextObjectComponent
                        key={obj.id}
                        object={obj}
                        slideWidth={width}
                        slideHeight={height}/>;
                </>;

            case ObjectType.Image:
                return <ImageObjectComponent
                    key={obj.id}
                    object={obj}
                    slideWidth={width}
                    slideHeight={height}/>;
            default:
                return null;
        }
    });

    const rect = <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="white"
        rx={borderRadius}
        ry={borderRadius}
    />;

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
                    {isView ? (
                        <mask id="myMask">
                            {rect}
                        </mask>
                    ) : rect}

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
            {isView ? (
                <g mask="url(#myMask)">
                    {viewObjects}
                </g>
            ) : viewObjects}


        </g>
    );
};
