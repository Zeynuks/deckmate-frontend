import React, {useState} from 'react';
import {ImageObject} from '../../../source/types.ts';

type ImageObjectProps = {
    slideObject: ImageObject;
    onView: boolean
};

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({
                                                                     slideObject,
                                                                     onView = false
                                                                 }) => {
    const [width] = useState(slideObject.size.width);
    const [height] = useState(slideObject.size.height);

    return (

        <svg
            width={width}
            height={height}
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
