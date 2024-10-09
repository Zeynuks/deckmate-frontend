import {ImageObject} from '../../../source/types.ts';

type ImageObjectProps = {
    slideObject: ImageObject;
    width: number;
    height: number;
    onView: boolean
};

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({
                                                                     slideObject,
                                                                     width,
                                                                     height,
                                                                     onView = false
                                                                 }) => {

    return (

        <svg
            width={width}
            height={height}
            pointerEvents='none'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
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
