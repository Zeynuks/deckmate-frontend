import React from 'react';
import { TextObject } from '../../../source/types';

type TextObjectProps = {
    object: TextObject;
};

const ORIGINAL_SLIDE_WIDTH = 1920;
const ORIGINAL_SLIDE_HEIGHT = 1080;

export const TextObjectComponent: React.FC<TextObjectProps> = ({ object }) => {
    const scaledX = (object.position.x / ORIGINAL_SLIDE_WIDTH) * 100;
    const scaledY = (object.position.y / ORIGINAL_SLIDE_HEIGHT) * 100;
    const fontSize = object.fontSize + '%';

    return (
        <text
            x={`${scaledX}%`}
            y={`${scaledY}%`}
            fontSize={fontSize}
            fontFamily={object.fontFamily}
            fontWeight={object.fontWeight || 'normal'}
            textAnchor={
                object.textAlign === 'center'
                    ? 'middle'
                    : object.textAlign === 'right'
                        ? 'end'
                        : 'start'
            }
            fill={object.color || '#000'}
            style={{
                lineHeight: object.lineHeight,
                whiteSpace: 'pre-line',
            }}
        >
            {object.content}
        </text>
    );
};
