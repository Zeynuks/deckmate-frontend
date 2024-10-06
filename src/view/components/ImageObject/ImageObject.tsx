// ImageObjectComponent.tsx

import React from 'react';
import {ImageObject} from '../../../source/types';

type ImageObjectProps = {
    object: ImageObject;
    slideWidth: number;
    slideHeight: number;
};

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({
                                                                     object,
                                                                     slideWidth,
                                                                     slideHeight,
                                                                 }) => {
    const scaledX = object.position.x / 1920 * slideWidth;
    const scaledY = object.position.y / 1080 * slideHeight;
    const scaledWidth = object.size.width / 1920 * slideWidth;
    const scaledHeight = object.size.height / 1080 * slideHeight;

    return (
        <image
            style={{
                padding: 0,
                margin: 0
            }}
            href={object.src}
            x={scaledX}
            y={scaledY}
            width={scaledWidth}
            height={scaledHeight}
        />
    );
};
