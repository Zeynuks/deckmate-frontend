import React, { useMemo } from 'react';
import { TextObject } from '../../../store/types.ts';

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
    const {
        content,
        fontSize,
        fontFamily,
        color = '#000',
    } = slideObject;

    const averageCharWidthFactor = 0.4;

    const maxCharsPerLine = useMemo(() => {
        return Math.floor(width / (fontSize * averageCharWidthFactor));
    }, [width, fontSize]);

    const lines = useMemo(() => {
        const words = content.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;

            if (testLine.length > maxCharsPerLine) {
                if (currentLine) {
                    lines.push(currentLine);
                }

                if (word.length > maxCharsPerLine) {
                    let start = 0;
                    while (start < word.length) {
                        const chunk = word.substr(start, maxCharsPerLine);
                        lines.push(chunk);
                        start += maxCharsPerLine;
                    }
                    currentLine = '';
                } else {
                    currentLine = word;
                }
            } else {
                currentLine = testLine;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }, [content, maxCharsPerLine]);

    return (
        <svg
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            pointerEvents='none'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
        >
            <text
                x={0}
                y={0}
                fontSize={fontSize}
                fontFamily={fontFamily}
                textAnchor="start"
                dominantBaseline="hanging"
                fill={color}
                cursor={onView ? 'grab' : 'default'}
            >
                {lines.map((line, index) => (
                    <tspan
                        key={index}
                        x={0}
                        y={fontSize * index}
                    >
                        {line}
                    </tspan>
                ))}
            </text>
        </svg>
    );
};
