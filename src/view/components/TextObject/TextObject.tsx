// TextObjectComponent.tsx

import React from 'react';
import {TextObject} from '../../../source/types';

type TextObjectProps = {
    object: TextObject;
    slideWidth: number;
    slideHeight: number;
};

export const TextObjectComponent: React.FC<TextObjectProps> = ({
                                                                   object,
                                                                   slideWidth,
                                                                   slideHeight,
                                                               }) => {
    const scaledX = (object.position.x + object.size.width / 1.3) / 1920 * slideWidth;
    const scaledY = (object.position.y + object.size.height / 4) / 1080 * slideHeight;
    const scaledFontSize = object.fontSize * slideWidth / 1920;

    return (
        <text
            x={scaledX}
            y={scaledY}
            fontSize={scaledFontSize}
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