import styles from './SlideList.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button';
import addIcon from '../../assets/icons/add.svg';
import trashIcon from '../../assets/icons/trash.svg';
import {Selected, Slide as SlideType} from '../../store/types';
import {dispatch} from '../../store/editor';
import {removeSlide} from '../../store/functions/removeSlide';
import {addSlide} from '../../store/functions/addSlide';
import {SlideListComponent} from '../SlideListComponent/SlideListComponent.tsx';
import {useCallback, useRef} from "react";

type SlideListProps = {
    slides: SlideType[];
    selected: Selected;
};
export const SlideList: React.FC<SlideListProps> = ({slides, selected}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const listHeight = slides.length > 5 ? (1080 + 40) * slides.length : (1080 + 40) * 4;

    const selectedSlideIndex = slides.findIndex(slide => slide.id === selected.slide) || 0;
    const selectedSlide = selectedSlideIndex >= 0 ? slides[selectedSlideIndex] : null;

    const scrollMove = useCallback((y: number) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollSpeed = 10;
        const isAboveHalf = y / listHeight * container.clientHeight + 160 > container.clientHeight / 2;

        container.scrollTop += isAboveHalf ? scrollSpeed : -scrollSpeed;
    }, [listHeight]);

    return (
        <section className={styles.slideMenu}>
            <div className={styles.slideButtons}>
                <Button
                    iconSrc={addIcon}
                    className={styles.addButton}
                    iconPosition={IconPosition.Right}
                    onClick={() => dispatch(addSlide)}
                >
                    Add Slide
                </Button>
                <Button
                    iconSrc={trashIcon}
                    className={styles.removeButton}
                    iconPosition={IconPosition.Right}
                    textColor="#FFFFFF"
                    onClick={() => {
                        dispatch(removeSlide);
                    }}
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
                            index={selectedSlideIndex}
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
