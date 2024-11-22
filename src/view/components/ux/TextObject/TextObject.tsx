import React from 'react';
import {
    Size,
    TextObject,
    TextSpan,
    TextStyle,
    TextHorizontalAlign,
    TextVerticalAlign,
} from '../../../../store/types.ts';

// Функции для CSS выравнивания
const mapHorizontalAlign = (
    align: TextHorizontalAlign
): React.CSSProperties['textAlign'] => {
    switch (align) {
        case TextHorizontalAlign.Left:
            return 'left';
        case TextHorizontalAlign.Middle:
            return 'center';
        case TextHorizontalAlign.Right:
            return 'right';
        default:
            return 'left';
    }
};

const mapVerticalAlign = (
    align: TextVerticalAlign
): React.CSSProperties['justifyContent'] => {
    switch (align) {
        case TextVerticalAlign.Top:
            return 'flex-start';
        case TextVerticalAlign.Middle:
            return 'center';
        case TextVerticalAlign.Bottom:
            return 'flex-end';
        default:
            return 'flex-start';
    }
};

type TextObjectProps = {
    object: TextObject;
    data: Size;
    onEdit?: () => void;
};

export const TextComponent: React.FC<TextObjectProps> = ({
                                                             object,
                                                             data,
                                                             onEdit,
                                                         }) => {
    const contentToHTML = (content: TextSpan[]): string => {
        return content
            .map((span) => {
                const styleString = span.style ? styleToCSS(span.style) : '';
                return `<span style="${styleString}">${span.text}</span>`;
            })
            .join('');
    };

    const styleToCSS = (style: TextStyle): string => {
        const css: string[] = [];
        if (style.color) css.push(`color: ${style.color}`);
        if (style.fontSize) css.push(`font-size: ${style.fontSize}px`);
        if (style.fontWeight) css.push(`font-weight: ${style.fontWeight}`);
        if (style.fontStyle) css.push(`font-style: ${style.fontStyle}`);
        if (style.textDecoration)
            css.push(`text-decoration: ${style.textDecoration}`);
        if (style.fontFamily) css.push(`font-family: ${style.fontFamily}`);
        if (style.backgroundColor)
            css.push(`background-color: ${style.backgroundColor}`);
        return css.join('; ');
    };

    const styleToCSSObject = (style: TextStyle): React.CSSProperties => {
        const css: React.CSSProperties = {};
        if (style.color) css.color = style.color;
        if (style.fontSize) css.fontSize = `${style.fontSize}px`;
        if (style.fontWeight) css.fontWeight = style.fontWeight;
        if (style.fontStyle) css.fontStyle = style.fontStyle;
        if (style.textDecoration) css.textDecoration = style.textDecoration;
        if (style.fontFamily) css.fontFamily = style.fontFamily;
        if (style.backgroundColor) css.backgroundColor = style.backgroundColor;
        return css;
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: mapVerticalAlign(object.style.verticalAlign),
        textAlign: mapHorizontalAlign(object.style.horizontalAlign),
        width: '100%',
        height: '100%',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        ...styleToCSSObject(object.style),
    };

    return (
        <svg
            x={-data.width / 2}
            y={-data.height / 2}
            width={data.width}
            height={data.height}
            pointerEvents="all"
            viewBox={`0 0 ${data.width} ${data.height}`}
            preserveAspectRatio="none"
        >
            <g>
                {onEdit && (
                    <foreignObject
                        width={data.width}
                        height={data.height}
                        style={{ pointerEvents: 'auto' }}
                        onDoubleClick={onEdit}
                    >
                        <div
                            contentEditable
                            style={containerStyle}
                            dangerouslySetInnerHTML={{
                                __html: contentToHTML(object.content),
                            }}
                        />
                    </foreignObject>
                )}

                {!onEdit && (
                    <foreignObject
                        width={data.width}
                        height={data.height}
                        style={{ pointerEvents: 'none' }}
                    >
                        <div
                            style={containerStyle}
                            dangerouslySetInnerHTML={{
                                __html: contentToHTML(object.content),
                            }}
                        />
                    </foreignObject>
                )}
            </g>
        </svg>
    );
};
