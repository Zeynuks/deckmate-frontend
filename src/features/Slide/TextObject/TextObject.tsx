import {TextObject} from '../../../source/types.ts';

type TextObjectProps = {
    slideObject: TextObject;
    height: number;
    width: number;
    onView?: boolean;
};

export const TextObjectComponent: React.FC<TextObjectProps> = ({
                                                                   slideObject,
                                                                   height,
                                                                   width,
                                                                   onView = false,
                                                               }) => {

    return <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
    >
        <text
            x={0}
            y={0}
            fontSize={slideObject.fontSize}
            fontFamily={slideObject.fontFamily}
            textAnchor="left"
            dominantBaseline="hanging"
            fill={slideObject.color || '#000'}
            cursor={onView ? 'grab' : 'default'}
        >
            {slideObject.content}
        </text>
    </svg>
};
