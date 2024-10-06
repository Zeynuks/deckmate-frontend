import React from 'react';
import { Slide as SlideType, ObjectType } from '../../../source/types';
import { TextObjectComponent } from '../TextObject/TextObject';
import { ImageObjectComponent } from '../ImageObject/ImageObject';

type SlideProps = {
    slide: SlideType;
    index: number;
    isSelected: boolean;
};

const CONFIG = {
    CONTAINER_WIDTH: 1920,
    NUMBER_WIDTH: 100,
    NUMBER_SLIDE_SPACING: 150,
    ASPECT_RATIO: 9 / 16,
    SLIDE_MARGIN: 50,
    SLIDE_BORDER_RADIUS: 150,
    BORDER_COLOR: '#D9D9D9',
    BORDER_WIDTH: 10,
    SELECTED_BORDER_COLOR: '#7B61FF',
    SELECTED_BORDER_WIDTH: 20,
    FONT_SIZE: 96,
};

export const SlideComponent: React.FC<SlideProps> = ({ slide, index, isSelected }) => {
    const {
        CONTAINER_WIDTH,
        NUMBER_WIDTH,
        NUMBER_SLIDE_SPACING,
        ASPECT_RATIO,
        SLIDE_MARGIN,
        SLIDE_BORDER_RADIUS,
        BORDER_COLOR,
        BORDER_WIDTH,
        SELECTED_BORDER_COLOR,
        SELECTED_BORDER_WIDTH,
        FONT_SIZE,
    } = CONFIG;

    const SLIDE_WIDTH = CONTAINER_WIDTH - NUMBER_WIDTH - NUMBER_SLIDE_SPACING;
    const SLIDE_HEIGHT = SLIDE_WIDTH * ASPECT_RATIO;

    const currentBorderColor = isSelected ? SELECTED_BORDER_COLOR : BORDER_COLOR;
    const currentBorderWidth = isSelected ? SELECTED_BORDER_WIDTH : BORDER_WIDTH;

    const borderOffset = currentBorderWidth / 2;
    const adjustedSlideWidth = SLIDE_WIDTH - currentBorderWidth;
    const adjustedSlideHeight = SLIDE_HEIGHT - currentBorderWidth;

    const transformY = (SLIDE_HEIGHT + SLIDE_MARGIN) * index;
    const slideXPosition = NUMBER_WIDTH + NUMBER_SLIDE_SPACING;
    const numberYPosition = SLIDE_HEIGHT / 2;

    const { id, background, objects } = slide;
    const { type: backgroundType } = background;

    return (
        <g transform={`translate(0, ${transformY})`}>

            <text
                x={NUMBER_WIDTH / 2}
                y={numberYPosition}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={FONT_SIZE}
                fill="#000"
            >
                {index + 1}
            </text>

            <g transform={`translate(${slideXPosition}, 0)`}>
                <defs>
                    <clipPath id={`clip-${id}`}>
                        <rect
                            x={borderOffset}
                            y={borderOffset}
                            width={adjustedSlideWidth}
                            height={adjustedSlideHeight}
                            rx={SLIDE_BORDER_RADIUS}
                            ry={SLIDE_BORDER_RADIUS}
                        />
                    </clipPath>
                </defs>

                {backgroundType === 'color' && (
                    <>
                        <rect
                            x={borderOffset}
                            y={borderOffset}
                            width={adjustedSlideWidth}
                            height={adjustedSlideHeight}
                            fill={background.color}
                            rx={SLIDE_BORDER_RADIUS}
                            ry={SLIDE_BORDER_RADIUS}
                        />
                        <rect
                            x={borderOffset}
                            y={borderOffset}
                            width={adjustedSlideWidth}
                            height={adjustedSlideHeight}
                            fill="none"
                            stroke={currentBorderColor}
                            strokeWidth={currentBorderWidth}
                            rx={SLIDE_BORDER_RADIUS}
                            ry={SLIDE_BORDER_RADIUS}
                        />
                    </>
                )}

                {backgroundType === 'image' && (
                    <>
                        <rect
                            x={borderOffset}
                            y={borderOffset}
                            width={adjustedSlideWidth}
                            height={adjustedSlideHeight}
                            fill="none"
                            rx={SLIDE_BORDER_RADIUS}
                            ry={SLIDE_BORDER_RADIUS}
                        />
                        <image
                            href={background.src}
                            x={borderOffset}
                            y={borderOffset}
                            width={adjustedSlideWidth}
                            height={adjustedSlideHeight}
                            preserveAspectRatio="xMidYMid slice"
                            clipPath={`url(#clip-${id})`}
                        />
                        <rect
                            x={borderOffset}
                            y={borderOffset}
                            width={adjustedSlideWidth}
                            height={adjustedSlideHeight}
                            fill="none"
                            stroke={currentBorderColor}
                            strokeWidth={currentBorderWidth}
                            rx={SLIDE_BORDER_RADIUS}
                            ry={SLIDE_BORDER_RADIUS}
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
        </g>
    );
};
