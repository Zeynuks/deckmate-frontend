import React, { useCallback, useRef } from 'react';
import {
    TextObject,
    Size,
    TextVerticalAlign,
} from '../../../store/types';
import {
    linesToHTML,
    parseHTMLtoTextObject,
} from '../../../utils/textUtils';

function mapVerticalAlign(va: TextVerticalAlign): React.CSSProperties['justifyContent'] {
    switch (va) {
        case TextVerticalAlign.Top:
            return 'flex-start';
        case TextVerticalAlign.Middle:
            return 'center';
        case TextVerticalAlign.Bottom:
            return 'flex-end';
        default:
            return 'flex-start';
    }
}

type TextComponentProps = {
    object: TextObject;
    size: Size;
    isEditing: boolean;
    onFinishEdit?: (updated: TextObject) => void;
};

export const TextComponent: React.FC<TextComponentProps> = ({
                                                                object,
                                                                size,
                                                                isEditing,
                                                                onFinishEdit,
                                                            }) => {
    const divRef = useRef<HTMLDivElement>(null);

    // Генерация HTML из модели
    const html = linesToHTML(object);

    // При потере фокуса парсим HTML обратно в модель
    const handleBlur = useCallback(() => {
        if (!isEditing) return;
        if (!divRef.current) return;

        const currentHTML = divRef.current.innerHTML;

        // Здесь при необходимости можно сделать санитизацию:
        // const safeHTML = DOMPurify.sanitize(currentHTML);
        // const newObj = parseHTMLtoTextObject(safeHTML, object);

        const newObj = parseHTMLtoTextObject(currentHTML, object);
        onFinishEdit?.(newObj);
    }, [isEditing, onFinishEdit, object]);

    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: mapVerticalAlign(object.verticalAlign),
    };

    return (
        <svg
            x={-size.width / 2}
            y={-size.height / 2}
            width={size.width}
            height={size.height}
            pointerEvents="all"
            viewBox={`0 0 ${size.width} ${size.height}`}
            preserveAspectRatio="none"
        >
            <g>
                <foreignObject
                    width={size.width}
                    height={size.height}
                    style={{ pointerEvents: 'auto' }}
                >
                    <div
                        ref={divRef}
                        contentEditable={isEditing}
                        style={containerStyle}
                        // Опционально: sanitize HTML, если источники небезопасны
                        dangerouslySetInnerHTML={{ __html: html }}
                        onBlur={handleBlur}
                    />
                </foreignObject>
            </g>
        </svg>
    );
};
