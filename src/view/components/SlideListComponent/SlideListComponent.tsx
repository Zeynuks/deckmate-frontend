// SlideListComponent.tsx

import React from 'react';
import {Slide as SlideType} from '../../../source/types';
import {Slide} from '../Slide/Slide';

type SlideListComponentProps = {
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
    BORDER_WIDTH: 15,
    SELECTED_BORDER_COLOR: '#7B61FF',
    SELECTED_BORDER_WIDTH: 50,
    FONT_SIZE: 96,
};

export const SlideListComponent: React.FC<SlideListComponentProps> = ({
                                                                          slide,
                                                                          index,
                                                                          isSelected,
                                                                      }) => {
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
                <g transform={`translate(${borderOffset}, ${borderOffset})`}>
                    <Slide
                        isView={true}
                        slide={slide}
                        width={adjustedSlideWidth}
                        height={adjustedSlideHeight}
                        borderRadius={SLIDE_BORDER_RADIUS}
                        transform={`translate(0, 0)`}
                    />
                </g>
            </g>
        </g>
    )
        ;
};
