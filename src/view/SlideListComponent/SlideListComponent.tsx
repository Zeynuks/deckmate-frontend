import { Selected, Slide as SlideType } from '../../store/types';
import { Slide } from '../Slide/Slide';
import styles from './SlideListComponent.module.css';
import { dispatch } from '../../store/editor';
import { setSelected } from '../../store/functions/setSelected';

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
                                                                      }) => {
    return (
        <div
            className={`${styles.slideWrapper} ${
                selected.slide === slide.id ? styles.selectedSlide : ''
            }`}
            onClick={() => {
                dispatch(setSelected, {
                    slide: slide.id,
                    objects: selected.objects,
                });
            }}
        >
            <span className={styles.buttonText}>{index + 1}</span>
            <svg
                className={styles.slide}
                viewBox={`10 10 ${slide.size.width -10} ${slide.size.height -10}`}
            >
                <Slide slide={slide} selectedObjectsId={selected.objects}/>
            </svg>
        </div>
    );
};
