import {Slide as SlideType} from '../../store/types.ts';
import {Slide} from './Slide.tsx';
import React from 'react';

type SlideProps = {
    slide: SlideType;
    onView?: boolean;
};

const BORDER_COLOR = '#D9D9D9';
const BORDER_WIDTH = 1;
const BORDER_RADIUS = 20;

export const SlideMask: React.FC<SlideProps> = ({
                                                slide
                                            }) => {
    return (
        <>
            <rect
                x={-BORDER_WIDTH}
                y={-BORDER_WIDTH}
                width={1920 + BORDER_WIDTH * 2}
                height={1080 + BORDER_WIDTH * 2}
                fill="transparent"
                stroke={BORDER_COLOR}
                strokeWidth={BORDER_WIDTH * 5}
                rx={BORDER_RADIUS}
                ry={BORDER_RADIUS}
            />
            <defs>
                <clipPath id={`slide-${slide.id}`}>
                    <rect
                        x={0}
                        y={0}
                        width={slide.size.width}
                        height={slide.size.height}
                        fill='transparent'
                        rx={20}
                        ry={20}
                    />
                </clipPath>
            </defs>
            <g clipPath={`url(#slide-${slide.id})`}>
                <Slide slide={slide} onView={true}/>
            </g>
        </>
    );
};
