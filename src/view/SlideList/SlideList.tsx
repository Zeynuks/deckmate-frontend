import styles from './SlideList.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button';
import addIcon from '../../assets/icons/add.svg';
import trashIcon from '../../assets/icons/trash.svg';
import {Selected, Slide as SlideType} from '../../store/types';
import {SlideListComponent} from '../SlideListComponent/SlideListComponent.tsx';
import {useCallback, useEffect, useRef, useState} from 'react';
import {RootState, useAppSelector} from '../../store/store.ts';
import {useAppActions} from '../../hooks/useAppActions.ts';

const SLIDE_HEIGHT = 1080 + 40;
const SCROLL_SPEED = 10;
//Магические числа
const SCALE_FACTOR = 5.67;

export const SlideList: React.FC = () => {
    const selected = useAppSelector((state: RootState) => state.selected);
    const slides = useAppSelector((state: RootState) => state.presentation.slides);

    const { addSlide, removeSlide } = useAppActions();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const selectedSlide = getSelectedSlide(slides, selected);
    const [listHeight, setListHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setListHeight(calculateListHeight(containerRef, slides.length));
        }
    }, [slides.length]);

    const scrollMove = useCallback(
        (y: number) => {
            const container = containerRef.current;
            if (!container) return;

            const isAboveHalf = isScrollAboveHalf(y, listHeight, container.clientHeight);
            container.scrollTop += isAboveHalf ? SCROLL_SPEED : -SCROLL_SPEED;
        },
        [listHeight]
    );

    return (
        <section className={styles.slideMenu}>
            <div className={styles.slideButtons}>
                <Button
                    iconSrc={addIcon}
                    className={styles.addButton}
                    iconPosition={IconPosition.Right}
                    onClick={() => addSlide()}
                >
                    Add Slide
                </Button>
                <Button
                    iconSrc={trashIcon}
                    className={styles.removeButton}
                    iconPosition={IconPosition.Right}
                    textColor="#FFFFFF"
                    onClick={() => removeSlide()}
                >
                    Remove
                </Button>
            </div>
            <div className={styles.scrollableContainer} ref={containerRef}>
                <svg
                    className={styles.slideListContainer}
                    viewBox={`0 0 1980 ${listHeight}`}
                    preserveAspectRatio="xMinYMin meet"
                >
                    {slides.map((slide, index) =>
                        slide.id !== selected.slide ? (
                            <SlideListComponent
                                key={slide.id}
                                index={index}
                                slide={slide}
                                selected={selected}
                                scrollMove={scrollMove}
                            />
                        ) : null
                    )}
                    {selectedSlide && (
                        <SlideListComponent
                            key={selectedSlide.id}
                            index={slides.findIndex(slide => slide.id === selected.slide)}
                            slide={selectedSlide}
                            selected={selected}
                            scrollMove={scrollMove}
                        />
                    )}
                </svg>
            </div>
        </section>
    );
};

function getSelectedSlide(slides: SlideType[], selected: Selected): SlideType | null {
    const selectedIndex = slides.findIndex(slide => slide.id === selected.slide);
    return selectedIndex >= 0 ? slides[selectedIndex] : null;
}

function isScrollAboveHalf(y: number, listHeight: number, containerHeight: number): boolean {
    return (y / listHeight) * containerHeight + 160 > containerHeight / 2;
}

function calculateListHeight(containerRef: React.RefObject<HTMLDivElement>, slideCount: number): number {
    if (!containerRef.current) return SLIDE_HEIGHT;
    const totalSlideHeight = SLIDE_HEIGHT * slideCount;
    const scaledContainerHeight = containerRef.current.clientHeight * SCALE_FACTOR;
    return scaledContainerHeight < totalSlideHeight ? totalSlideHeight : scaledContainerHeight;
}
