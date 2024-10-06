import React from 'react';
import { ImageObject } from '../../../source/types';

type ImageObjectProps = {
    object: ImageObject;
};

const ORIGINAL_SLIDE_WIDTH = 1920;
const ORIGINAL_SLIDE_HEIGHT = 1080;

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({ object }) => {
    const scaledX = (object.position.x / ORIGINAL_SLIDE_WIDTH) * 100;
    const scaledY = (object.position.y / ORIGINAL_SLIDE_HEIGHT) * 100;
    const scaledWidth = (object.size.width / ORIGINAL_SLIDE_WIDTH) * 100;
    const scaledHeight = (object.size.height / ORIGINAL_SLIDE_HEIGHT) * 100;

    return (
        <image
            href={object.src}
            x={`${scaledX}%`}
            y={`${scaledY}%`}
            width={`${scaledWidth}%`}
            height={`${scaledHeight}%`}
        />
    );
};
