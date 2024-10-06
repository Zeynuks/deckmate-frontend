import React from 'react';
import styles from './SlideList.module.css';
import { Button } from '../components/design-system/Button/Button';
import addIcon from '../../assets/icons/add.svg';
import { Presentation, Selected } from '../../source/types';
import { SlideListComponent } from '../components/SlideListComponent/SlideListComponent.tsx';

type SlideListProps = {
    presentation: Presentation;
    selected: Selected;
};

export const SlideList: React.FC<SlideListProps> = ({ presentation, selected }) => {
    return (
        <section className={styles.slideMenu}>
            <Button
                iconSrc={addIcon}
                iconPosition="right"
                fullWidth
                border
                onClick={() => {}}
            >
                Add Slide
            </Button>
            <div className={styles.svgContainer}>
                <svg
                    className={styles.slideList}
                    viewBox={`0 0 1920 ${presentation.slides.length * (1080)}`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {presentation.slides.map((slide, index) => (
                        <SlideListComponent
                            key={slide.id}
                            slide={slide}
                            index={index}
                            isSelected={slide.id === selected.slideId} // Передаем isSelected
                        />
                    ))}
                </svg>
            </div>
        </section>
    );
};
