import React, {useState} from 'react';
import {ImageObject} from '../../../source/types.ts';

type ImageObjectProps = {
    object: ImageObject;
    onView: boolean
};

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({
                                                                     object,
                                                                     onView = false
                                                                 }) => {
    const [width] = useState(object.size.width);
    const [height] = useState(object.size.height);

    return (

        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
        >
            <image
                href={object.src}
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
