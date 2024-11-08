import React, {useRef, useState} from 'react';
import styles from './WorkSpace.module.css';
import {Presentation, Selected} from '../../store/types.ts';
import {Slide} from '../Slide/Slide.tsx';
import {useDimensions} from '../../hooks/useDimensions';
import {ContextMenu} from '../components/ui/ContextMenu/ContextMenu.tsx';
import {dispatch} from '../../store/editor.ts';
import {removeObject} from '../../store/functions/removeObject.ts';

type WorkspaceProps = {
    presentation: Presentation;
    selected: Selected;
    scale: number;
    backgroundColor?: string;
};

// TODO: Убрать использование глобальных переменных

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
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const closeMenu = () => {
        setMenuPosition(null);
    };

    const {BORDER_COLOR, BORDER_WIDTH, BORDER_RADIUS, PADDING} = CONFIG;
    const workspaceRef = useRef<HTMLDivElement>(null);
    const dimensions = useDimensions(workspaceRef);

    const selectedSlide = presentation.slides.find(
        (slide) => slide.id === selected.slide
    );

    return (
        <div className={styles.workspaceContainer} onContextMenu={handleContextMenu} onClick={closeMenu} style={{ width: '100%', height: '100%' }}>
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
                            <Slide slide={selectedSlide} selectedObjectsId={selected.objects} borderRadius={BORDER_RADIUS} onView={true}/>

                        </g>
                    </svg>
                )}
            </div>
            <ContextMenu position={menuPosition} onRemove={()=> dispatch(removeObject)}/>
        </div>
    );
};
