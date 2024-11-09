import {Selected, Slide as SlideType} from '../../store/types';
import {Slide} from '../Slide/Slide';
import {dispatch} from '../../store/editor.ts';
import {setSelected} from '../../store/functions/setSelected.ts';
import {useLayoutEffect, useRef, useState} from 'react';
import {useDrag} from '../../hooks/useDrag.ts';
import {reorderSlide} from '../../store/functions/reorderSlide.ts';

type SlideListComponentProps = {
    index: number;
    slide: SlideType;
    selected: Selected;
    scrollMove: (y: number) => void;
};

const SVG_WIDTH = 1920;
const SVG_HEIGHT = 1080;
const VIEWBOX = `-20 -20 ${SVG_WIDTH + 40} ${SVG_HEIGHT + 40}`;

export const SlideListComponent: React.FC<SlideListComponentProps> = ({
                                                                          index,
                                                                          slide,
                                                                          selected,
                                                                          scrollMove
                                                                      }) => {
    const isSelected = selected.slide === slide.id;
    const initialPosition = { x: 0, y: (SVG_HEIGHT + 40) * index };
    const slideRef = useRef<SVGGElement | null>(null);
    const [localPosition, setLocalPosition] = useState(initialPosition);

    useLayoutEffect(() => {
        setLocalPosition({ x: 0, y: (1080 + 40) * index });
    }, [index]);

    const { handleDragMouseDown } = useDrag({
        position: localPosition,
        onDrag: (x, y) => {
            x = 0;
            y = Math.max(0, y);
            setLocalPosition({ x, y });
            scrollMove(y);
        },
        onDragEnd: (_x, y) => {
            const newIndex = Math.round(y /  (SVG_HEIGHT + 40) );
            setLocalPosition({ x: 0, y: (SVG_HEIGHT + 40) * index });
            dispatch(reorderSlide, newIndex);
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
                viewBox={VIEWBOX}
                onMouseDown={isSelected? handleDragMouseDown: () => {}}
                onClick={() =>
                    dispatch(setSelected, {
                        ...selected,
                        slide: slide.id,
                    })
                }
            >
                <rect
                    x={0}
                    y={0}
                    width={SVG_WIDTH}
                    height={SVG_HEIGHT}
                    fill="none"
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
                    <Slide slide={slide} selectedObjectsId={selected.objects} />
                </g>
            </svg>
        </g>
    );
};
