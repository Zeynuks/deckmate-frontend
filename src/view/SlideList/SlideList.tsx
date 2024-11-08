// SlideList.tsx
import React from 'react';
import styles from './SlideList.module.css';
import {Button, IconPosition} from '../components/ui/Button/Button';
import addIcon from '../../assets/icons/add.svg';
import trashIcon from '../../assets/icons/trash.svg';
import {Selected, Slide} from '../../store/types';
import {SlideListComponent} from '../SlideListComponent/SlideListComponent';
import {dispatch} from '../../store/editor';
import {removeSlide} from '../../store/functions/removeSlide';
import {addSlide} from '../../store/functions/addSlide';

type SlideListProps = {
    slides: Slide[];
    selected: Selected;
};

//TODO: Переписать на svg

export const SlideList: React.FC<SlideListProps> = ({slides, selected}) => {
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
            <svg x={0} y={0} viewBox={`0 0 ${1920 + 400} ${1090 * slides.length}`}>
                {slides.map((slide, index) => (
                    <foreignObject x={0} y={1100 * index} width={1920 + 400} height={1080}>
                        <div key={slide.id} className={styles.slideItem}>
                            <SlideListComponent
                                slide={slide}
                                index={index}
                                selected={selected}
                                totalSlides={slides.length}
                            />
                        </div>
                    </foreignObject>
                ))}
            </svg>

        </section>
    );
};
