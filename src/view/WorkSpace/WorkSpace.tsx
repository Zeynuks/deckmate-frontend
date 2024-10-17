import React, {useRef} from 'react';
import styles from './WorkSpace.module.css';
import {Presentation, Selected} from '../../store/types.ts';
import {Slide} from '../Slide/Slide.tsx';
import {useDimensions} from '../../hooks/useDimensions';

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
    const {BORDER_COLOR, BORDER_WIDTH, BORDER_RADIUS, PADDING} = CONFIG;
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
                {selectedSlide && (
                    <svg
                        width={dimensions.width}
                        height={dimensions.height}
                        viewBox={`0 0 ${selectedSlide.size.width + PADDING * 2} ${selectedSlide.size.height + PADDING * 2}`}
                        style={{display: 'block', backgroundColor}}>
                        <g  transform={`translate(${PADDING}, ${PADDING})`}>
                            <rect
                                x={-BORDER_WIDTH}
                                y={-BORDER_WIDTH}
                                width={selectedSlide.size.width + BORDER_WIDTH * 2}
                                height={selectedSlide.size.height  + BORDER_WIDTH * 2}
                                fill="none"
                                stroke={BORDER_COLOR}
                                strokeWidth={BORDER_WIDTH * 5}
                                rx={BORDER_RADIUS}
                                ry={BORDER_RADIUS}
                            />
                            <Slide slide={selectedSlide} selectedObjectsId={selected.objectId} borderRadius={BORDER_RADIUS} onView={true}/>

                        </g>
                    </svg>
                )}
            </div>
        </div>
    );
};
