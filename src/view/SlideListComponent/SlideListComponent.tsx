// SlideListComponent.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from '../../hooks/useDrag';
import { Selected, Slide as SlideType } from '../../store/types';
import { Slide } from '../Slide/Slide';
import styles from './SlideListComponent.module.css';
import { Typography } from '../components/ui/Typography/Typography';
import { dispatch } from '../../store/editor';
import { setSelected } from '../../store/functions/setSelected';
import { reorderSlides } from '../../store/functions/reorderSlides';

type SlideListComponentProps = {
    slide: SlideType;
    index: number;
    selected: Selected;
    totalSlides: number;
};

export const SlideListComponent: React.FC<SlideListComponentProps> = ({
                                                                          slide,
                                                                          index,
                                                                          selected,
                                                                          totalSlides,
                                                                      }) => {
    const slideRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [currentY, setCurrentY] = useState(0);
    const [startY, setStartY] = useState(0);
    const [startIndex, setStartIndex] = useState(index);
    const [slideHeight, setSlideHeight] = useState(0);

    const position = { x: 0, y: 0 };

    const { handleDragMouseDown } = useDrag({
        position,
        onDrag: (x, y) => {
            setCurrentY(y);
        },
        onView: true,
        objectRef: slideRef,
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setStartY(0); // Начальная позиция Y
        setStartIndex(index);
        handleDragMouseDown(e);
    };

    useEffect(() => {
        if (slideRef.current) {
            const rect = slideRef.current.getBoundingClientRect();
            setSlideHeight(rect.height);
        }
    }, []);

    useEffect(() => {
        if (isDragging) {
            const handleMouseUp = () => {
                const deltaY = currentY - startY;
                const deltaIndex = Math.round(deltaY / slideHeight);
                let newIndex = startIndex + deltaIndex;

                if (newIndex < 0) newIndex = 0;
                if (newIndex >= totalSlides) newIndex = totalSlides - 1;

                if (newIndex !== startIndex) {
                    dispatch(reorderSlides, { fromIndex: startIndex, toIndex: newIndex });
                }

                setIsDragging(false);
            };

            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, currentY, startY]);

    return (
        <div
            className={`${styles.slideWrapper} ${
                selected.slideId === slide.id ? styles.selectedSlide : ''
            }`}
            onClick={() => {
                dispatch(setSelected, {
                    slideId: slide.id,
                    objectId: selected.objectId,
                });
            }}
            onMouseDown={handleMouseDown}
        >
            <Typography variant="buttonText">{index + 1}</Typography>
            <svg
                className={styles.miniature}
                viewBox={`0 0 ${slide.size.width} ${slide.size.height}`}
            >
                <rect
                    x={0}
                    y={0}
                    width={slide.size.width}
                    height={slide.size.height}
                    fill="none"
                    stroke={selected.slideId === slide.id ? '#7B61FF' : '#D9D9D9'}
                    strokeWidth={selected.slideId === slide.id ? 4 : 2}
                />
                <Slide slide={slide} selectedObjectsId={selected.objectId} />
            </svg>
        </div>
    );
};
