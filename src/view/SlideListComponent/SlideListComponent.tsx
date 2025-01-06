import {Selected, Slide as SlideType} from '../../store/types';
import {Slide} from '../Slide/Slide';
import {useLayoutEffect, useRef, useState} from 'react';
import {useDrag} from '../../hooks/useDrag.ts';
import {useAppActions} from '../../hooks/useAppActions.ts';

type SlideListComponentProps = {
    index: number;
    slide: SlideType;
    selected: Selected;
    scrollMove: (y: number) => void;
};

const SVG_WIDTH = 1920;
const SVG_HEIGHT = 1080;
const VIEWABLE = `-20 -20 ${SVG_WIDTH + 40} ${SVG_HEIGHT + 40}`;

export const SlideListComponent: React.FC<SlideListComponentProps> = ({
                                                                          index,
                                                                          slide,
                                                                          selected,
                                                                          scrollMove
                                                                      }) => {
    const {reorderSlide, setSelected} = useAppActions();
    const isSelected = selected.slide === slide.id;
    const initialPosition = {x: 0, y: (SVG_HEIGHT + 40) * index};
    const slideRef = useRef<SVGGElement | null>(null);
    const [localPosition, setLocalPosition] = useState(initialPosition);
    const [isDrag, setIsDrag] = useState(false);
    useLayoutEffect(() => {
        setLocalPosition({x: 0, y: (1080 + 40) * index});
    }, [index]);

    const {handleDragMouseDown} = useDrag({
        position: localPosition,
        onDrag: (x, y) => {
            x = 0;
            y = Math.max(0, y);
            setLocalPosition({x, y});
            scrollMove(y);
            setIsDrag(true);
        },
        onDragEnd: (_x, y) => {
            const toIndex = Math.round(y / (SVG_HEIGHT + 40));
            setLocalPosition({x: 0, y: (SVG_HEIGHT + 40) * index});
            reorderSlide(toIndex);
            setIsDrag(false);
        },
        objectRef: slideRef,
    });
    return (
        <g ref={slideRef}>
            <svg
                x={localPosition.x}
                y={localPosition.y}
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                viewBox={VIEWABLE}
                onMouseDown={isSelected ? handleDragMouseDown : () => {
                }}
                onClick={() => setSelected(slide.id)}
                style={isDrag ? {opacity: 0.7} : {}}
            >
                <rect
                    x={0}
                    y={0}
                    width={SVG_WIDTH}
                    height={SVG_HEIGHT}
                    fill="black"
                    stroke={isSelected ? '#7B61FF' : '#D9D9D9'}
                    strokeWidth={isSelected ? 30 : 10}
                    rx={80}
                    ry={80}
                />
                <defs>
                    <clipPath id={`clip-slide-${slide.id}`}>
                        <rect
                            x={0}
                            y={0}
                            width={SVG_WIDTH}
                            height={SVG_HEIGHT}
                            fill="none"
                            rx={80}
                            ry={80}
                        />
                    </clipPath>
                </defs>
                <g clipPath={`url(#clip-slide-${slide.id})`}>
                    <Slide slide={slide} borderRadius={20}/>
                </g>
            </svg>
        </g>
    );
};
