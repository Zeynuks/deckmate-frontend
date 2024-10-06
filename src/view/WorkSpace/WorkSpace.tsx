import React, {useEffect, useRef, useState} from 'react';
import styles from './WorkSpace.module.css';
import {Presentation, Selected} from '../../source/types.ts';
import {Slide} from '../components/Slide/Slide.tsx';

type WorkspaceProps = {
    presentation: Presentation;
    selected: Selected;
    scale: number;
    backgroundColor?: string;
};

const CONFIG = {
    ASPECT_RATIO: 16 / 9,
    SLIDE_MARGIN: 24,
    SLIDE_BORDER_RADIUS: 2,
    BORDER_COLOR: '#D9D9D9',
    BORDER_WIDTH: 20,
};

export const PresentationWorkspace: React.FC<WorkspaceProps> = ({
                                                                    presentation,
                                                                    selected,
                                                                    scale,
                                                                    backgroundColor = '#FBFCFD',
                                                                }) => {
    const {
        ASPECT_RATIO,
        SLIDE_MARGIN,
        SLIDE_BORDER_RADIUS,
        BORDER_COLOR,
        BORDER_WIDTH,
    } = CONFIG;

    const workspaceRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const updateDimensions = () => {
            if (workspaceRef.current) {
                setDimensions({
                    width: workspaceRef.current.clientWidth,
                    height: workspaceRef.current.clientHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const selectedSlideId = presentation.slides.findIndex(slide => slide.id === selected.slideId);
    const selectedSlide = presentation.slides[selectedSlideId];
    return (
        <div className={styles.workspaceContainer}>
            <div
                ref={workspaceRef}
                className={styles.workspace}
                style={{
                    backgroundColor,
                    transform: `scale(${scale})`,
                }}
            >
                <svg
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{
                        display: 'block',
                        backgroundColor: backgroundColor
                    }}
                >
                    <rect
                        transform={`translate(${SLIDE_MARGIN}, ${SLIDE_MARGIN})`}
                        x={0}
                        y={0}
                        width={dimensions.width - SLIDE_MARGIN * 2}
                        height={dimensions.width / ASPECT_RATIO}
                        fill="none"
                        stroke={BORDER_COLOR}
                        strokeWidth={SLIDE_BORDER_RADIUS}
                        rx={BORDER_WIDTH}
                        ry={BORDER_WIDTH}
                    />

                    <Slide
                        transform={`translate(${SLIDE_MARGIN}, ${SLIDE_MARGIN})`}
                        slide={selectedSlide}
                        height={dimensions.width / ASPECT_RATIO}
                        width={dimensions.width - SLIDE_MARGIN * 2}
                        borderRadius={BORDER_WIDTH}
                    >
                    </Slide>
                </svg>
            </div>
        </div>
    );
};
