import styles from './SlideList.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button';
import addIcon from '../../assets/icons/add.svg';
import trashIcon from '../../assets/icons/trash.svg';
import {Selected, Slide as SlideType} from '../../store/types';
import {useDispatch} from 'react-redux';
import {SlideListComponent} from '../SlideListComponent/SlideListComponent.tsx';
import {useCallback, useRef} from 'react';
import {ActionTypes} from '../../store/actionTypes.ts';

type SlideListProps = {
    slides: SlideType[];
    selected: Selected;
};

const SLIDE_HEIGHT = 1080 + 40;
const SCROLL_SPEED = 10;
//Магические числа
const SCALE_FACTOR = 5.67;

export const SlideList: React.FC<SlideListProps> = ({slides, selected}) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const selectedSlide = getSelectedSlide(slides, selected);
    const listHeight = calculateListHeight(containerRef, slides.length);

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
                    onClick={() =>
                        dispatch({
                            type: ActionTypes.ADD_SLIDE,
                        })
                    }
                >
                    Add Slide
                </Button>
                <Button
                    iconSrc={trashIcon}
                    className={styles.removeButton}
                    iconPosition={IconPosition.Right}
                    textColor="#FFFFFF"
                    onClick={() =>
                        dispatch({
                            type: ActionTypes.REMOVE_SLIDE,
                        })
                    }
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
