import styles from './ElementPanel.module.css';
import {Button} from '../components/ui/Button/Button.tsx';

import imageIcon from '../../assets/icons/gallery.svg';
import rectIcon from '../../assets/icons/rect.svg';
import ellipseIcon from '../../assets/icons/ellipse.svg';
import triangleIcon from '../../assets/icons/triangle.svg';
import textAreaIcon from '../../assets/icons/text-area.svg';
import {dispatch} from '../../store/editor.ts';
import {addTextObject} from '../../store/functions/addTextObject.ts';
import {addImageObject} from '../../store/functions/addImageObject.ts';

type ElementPanelProps = {
    onText: () => void;
    onImage: () => void;
    onRect: () => void;
    onEllipse: () => void;
    onTriangle: () => void;
};

export const ElementPanel: React.FC<ElementPanelProps> = ({
                                                              onEllipse,
                                                              onRect,
                                                              onTriangle,
                                                          }) => {
    return (
        <section className={styles.elementPanel}>
            <Button iconSrc={textAreaIcon}   onClick={() => {dispatch(addTextObject);}} color={'none'} iconPosition={'top'}>Text</Button>
            <Button iconSrc={imageIcon} onClick={() => {dispatch(addImageObject);}} color={'none'} iconPosition={'top'}>Image</Button>
            <Button iconSrc={triangleIcon} onClick={onTriangle} color={'none'} iconPosition={'top'}>Triangle</Button>
            <Button iconSrc={ellipseIcon} onClick={onEllipse} color={'none'} iconPosition={'top'}>Ellipse</Button>
            <Button iconSrc={rectIcon} onClick={onRect} color={'none'} iconPosition={'top'}>Rect</Button>
        </section>
    );
};
