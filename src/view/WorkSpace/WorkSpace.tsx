import React, {useRef, useState} from 'react';
import styles from './WorkSpace.module.css';
import {Slide} from '../Slide/Slide.tsx';
import {useDimensions} from '../../hooks/useDimensions';
import {ContextMenu} from '../components/ui/ContextMenu/ContextMenu.tsx';
import {RootState, useAppSelector} from '../../store/store.ts';
import {useAppActions} from '../../hooks/useAppActions.ts';


type WorkspaceProps = {
    scale?: number;
    backgroundColor?: string;
};

const BORDER_COLOR = '#D9D9D9';
const BORDER_WIDTH = 1;
const BORDER_RADIUS = 20;
const PADDING = 48;

export const PresentationWorkspace: React.FC<WorkspaceProps> = ({
                                                                    scale,
                                                                    backgroundColor = '#FBFCFD',
                                                                }) => {
    const {removeObject} = useAppActions();
    const selected = useAppSelector((state: RootState) => state.selected);
    const slides = useAppSelector((state: RootState) => state.presentation.slides);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const closeMenu = () => {
        setMenuPosition(null);
    };

    const workspaceRef = useRef<HTMLDivElement>(null);
    const dimensions = useDimensions(workspaceRef);

    const selectedSlide = selected && selected.slide ?
        slides.find(
            (slide) => slide.id === selected.slide
        ) : null;

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
                        viewBox={`0 0 ${1920 + PADDING * 2} ${1080 + PADDING * 2}`}
                        style={{display: 'block', backgroundColor}}>
                        <g  transform={`translate(${PADDING}, ${PADDING})`}>
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
                            <Slide slide={selectedSlide} selectedObjectsId={selected.objects} onView={true}/>

                        </g>
                    </svg>
                )}
            </div>
            <ContextMenu position={menuPosition} onRemove={()=> removeObject()}/>
        </div>
    );
};
