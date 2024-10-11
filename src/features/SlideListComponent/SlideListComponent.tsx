import React from 'react';
import {Selected, Slide as SlideType} from '../../store/types.ts';
import { Slide } from '../Slide/Slide.tsx';
import styles from './SlideListComponent.module.css';
import { Typography } from "../../view/components/ui/Typography/Typography.tsx";
import {dispatch} from "../../store/editor.ts";
import {setSelected} from "../../store/functions/setSelected.ts";

type SlideListComponentProps = {
    slide: SlideType;
    index: number;
    selected: Selected;
};

export const SlideListComponent: React.FC<SlideListComponentProps> = ({
                                                                          slide,
                                                                          index,
                                                                          selected
                                                                      }) => {
    return (
        <div
            className={`${styles.slideWrapper} ${selected.slideId === slide.id ? styles.selectedSlide : ''}`}
            onClick={() => {dispatch(setSelected, {
                slideId: slide.id,
                objectId: selected.objectId,
            })}}>
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
                    stroke={selected.slideId === slide.id ? '#7B61FF' : '#D9D9D9'}
                    strokeWidth={selected.slideId === slide.id ? 4 : 2}
                />
                <Slide slide={slide} borderRadius={10} selectedObjects={selected.objectId} />
            </svg>
        </div>
    );
};
