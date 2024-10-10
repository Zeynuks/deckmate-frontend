import React from 'react';
import { Slide as SlideType } from '../../store/types.ts';
import { Slide } from '../Slide/Slide.tsx';
import styles from './SlideListComponent.module.css';
import { Typography } from "../../view/components/ui/Typography/Typography.tsx";

type SlideListComponentProps = {
    slide: SlideType;
    index: number;
    isSelected: boolean;
};

export const SlideListComponent: React.FC<SlideListComponentProps> = ({
                                                                          slide,
                                                                          index,
                                                                          isSelected,
                                                                      }) => {
    return (
        <div className={`${styles.slideWrapper} ${isSelected ? styles.selectedSlide : ''}`}>
            <Typography variant="buttonText">{index + 1}</Typography>
            <svg
                className={styles.miniature}
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid meet"
            >
                <rect
                    x={0}
                    y={0}
                    width={1920}
                    height={1080}
                    fill="none"
                    stroke={isSelected ? '#7B61FF' : '#D9D9D9'}
                    strokeWidth={isSelected ? 4 : 2}
                />
                <Slide slide={slide} borderRadius={10} />
            </svg>
        </div>
    );
};
