import React from 'react';
import styles from './SlideList.module.css';
import { Button } from '../../view/components/ui/Button/Button.tsx';
import addIcon from '../../assets/icons/add.svg';
import {Presentation, Selected} from '../../store/types.ts';
import { SlideListComponent } from '../SlideListComponent/SlideListComponent.tsx';

type SlideListProps = {
    presentation: Presentation; //Заменить на slide
    selected: Selected;
    onAddSlide: () => void;
};

export const SlideList: React.FC<SlideListProps> = ({
                                                        presentation,
                                                        selected,
                                                        onAddSlide,
                                                    }) => (
    <section className={styles.slideMenu}>
        <Button
            iconSrc={addIcon}
            iconPosition="right"
            fullWidth
            border
            onClick={onAddSlide}
        >
            Add Slide
        </Button>
        <div className={styles.slideListContainer}>
            {presentation.slides.map((slide, index) => (
                <SlideListComponent
                    key={slide.id}
                    slide={slide}
                    index={index}
                    selected={selected}
                />
            ))}
        </div>
    </section>
);
