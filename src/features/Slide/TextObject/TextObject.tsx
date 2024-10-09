import React from 'react';
import {TextObject} from '../../../source/types.ts';

type TextObjectProps = {
    object: TextObject;
    onView?: boolean
};

export const TextObjectComponent: React.FC<TextObjectProps> = ({
                                                                   object,
                                                                   onView = false
                                                               }) => (
    <text
        x={0}
        y={0}
        fontSize={object.fontSize}
        fontFamily={object.fontFamily}
        textAnchor={object.textAlign === 'center' ? 'middle' : object.textAlign === 'right' ? 'end' : 'start'}
        fill={object.color || '#000'}
        cursor={onView ? "grab" : "default"}>
        {object.content}
    </text>
);
