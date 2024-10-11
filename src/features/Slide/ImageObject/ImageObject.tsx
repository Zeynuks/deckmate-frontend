import {ImageObject} from '../../../store/types.ts';

type ImageObjectProps = {
    slideObject: ImageObject;
    width: number;
    height: number;
    onClick?: () => void;
    onView: boolean
};

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({
                                                                     slideObject,
                                                                     width,
                                                                     height,
                                                                     onClick,
                                                                     onView = false
                                                                 }) => {
    return (

        <svg
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            pointerEvents='none'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            onClick={onClick}
        >
            <image
                href={slideObject.src}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                cursor={onView ? "grab" : "default"}
            />
        </svg>
    );
};
