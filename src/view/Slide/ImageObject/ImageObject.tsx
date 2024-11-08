import {ImageObject, Size} from '../../../store/types.ts';

type ImageObjectProps = {
    object: ImageObject;
    data: Size
};

export const ImageComponent: React.FC<ImageObjectProps> = ({
                                                                     object,
                                                               data
                                                                 }) => {
    return (
        <svg
            x={-data.width / 2}
            y={-data.height / 2}
            width={data.width}
            height={data.height}
            pointerEvents='none'
            viewBox={`0 0 ${data.width} ${data.height}`}
            preserveAspectRatio="none"
        >
            <image
                href={object.src}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
            />
        </svg>
    );
};
