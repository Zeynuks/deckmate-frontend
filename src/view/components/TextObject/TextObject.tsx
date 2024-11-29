import React, {useEffect, useRef} from 'react';
import {
    Size,
    TextObject,
    TextSpan,
    TextStyle,
    TextHorizontalAlign,
    TextVerticalAlign,
} from '../../../store/types.ts';

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
    size: Size;
    isEditing: boolean;
};

export const TextComponent: React.FC<TextObjectProps> = ({
                                                             object,
                                                             size,
                                                             isEditing,
                                                         }) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

    const contentToHTML = (content: TextSpan[]): string => {
        return content
            .map((span) => {
                const styleString = span.style ? styleToCSS(span.style) : '';
                return `<span style="${styleString}" >${span.text}</span>`;
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

    const setCursorAtMousePosition = (element: HTMLElement, x: number, y: number) => {
        if (!element.isContentEditable) return;

        const caretPosition =
            (document as Document & {
                caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
            }).caretPositionFromPoint?.(x, y);

        let range: Range | null = null;

        if (caretPosition) {
            range = document.createRange();
            range.setStart(caretPosition.offsetNode, caretPosition.offset);
            range.collapse(true);
        } else if ('caretRangeFromPoint' in document && document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(x, y);
        }

        if (range) {
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    };

    useEffect(() => {
        if (isEditing && lastMousePosition.current && divRef.current) {
            const { x, y } = lastMousePosition.current;
            setCursorAtMousePosition(divRef.current, x, y);
            divRef.current.focus();
        }
    }, [isEditing]);

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
                    style={{pointerEvents: 'auto'}}
                >
                    <div
                        contentEditable={isEditing}
                        style={containerStyle}
                        dangerouslySetInnerHTML={{
                            __html: contentToHTML(object.content),
                        }}
                    />
                </foreignObject>
            </g>
        </svg>
    );
};
