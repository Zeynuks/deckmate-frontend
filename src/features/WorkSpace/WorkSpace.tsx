import React, { useRef } from 'react';
import styles from './WorkSpace.module.css';
import { Presentation, Selected } from '../../source/types.ts';
import { Slide } from '../Slide/Slide.tsx';
import { useDimensions } from '../../hooks/useDimensions';

type WorkspaceProps = {
    presentation: Presentation;
    selected: Selected;
    scale: number;
    backgroundColor?: string;
};

const CONFIG = {
    BORDER_COLOR: '#D9D9D9',
    BORDER_WIDTH: 1,
    BORDER_RADIUS: 20,
    PADDING: 48
};

export const PresentationWorkspace: React.FC<WorkspaceProps> = ({
                                                                    presentation,
                                                                    selected,
                                                                    scale,
                                                                    backgroundColor = '#FBFCFD',
                                                                }) => {
    const { BORDER_COLOR, BORDER_WIDTH, BORDER_RADIUS, PADDING } = CONFIG;
    const workspaceRef = useRef<HTMLDivElement>(null);
    const dimensions = useDimensions(workspaceRef);

    const selectedSlide = presentation.slides.find(
        (slide) => slide.id === selected.slideId
    );

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
                    viewBox={`0 0 ${1920 + PADDING * 2} ${1080}`}
                    style={{ display: 'block', backgroundColor }}
                >
                    <g transform={`translate(${PADDING}, ${PADDING})`}>
                        <rect
                            x={-BORDER_WIDTH}
                            y={-BORDER_WIDTH}
                            width={1920 + BORDER_WIDTH * 2}
                            height={1080 + BORDER_WIDTH * 2}
                            fill="none"
                            stroke={BORDER_COLOR}
                            strokeWidth={BORDER_WIDTH * 2}
                            rx={BORDER_RADIUS}
                            ry={BORDER_RADIUS}
                        />

                        {selectedSlide && (
                            <Slide slide={selectedSlide} borderRadius={BORDER_RADIUS} />
                        )}
                    </g>
                </svg>
            </div>
        </div>
    );
};
