import React from 'react';
import {
    TextObject,
    TextSpan,
    TextStyle,
} from '../../../store/types';
import useEditableContent from '../../../hooks/useEditableContent.ts'; // Путь к хуку

type TextObjectProps = {
    slideObject: TextObject;
    height: number;
    width: number;
    onView?: boolean;
    onMouseDown?: () => void;
};

export const TextObjectComponent: React.FC<TextObjectProps> = ({
                                                                   slideObject,
                                                                   height,
                                                                   width,
                                                                   onMouseDown,
                                                                   onView = false,
                                                               }) => {
    const {content = [], style = {}} = slideObject;
    const {
        editedContent,
        isEditing,
        contentEditableRef,
        startEditing,
        stopEditing,
        handleInput,
    } = useEditableContent(content);

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
        if (style.textDecoration) css.push(`text-decoration: ${style.textDecoration}`);
        if (style.fontFamily) css.push(`font-family: ${style.fontFamily}`);
        return css.join('; ');
    };

    const handleTextDoubleClick = () => {
        if (!onView) {
            return;
        }
        startEditing();
    };

    const handleBlur = () => {
        stopEditing();
        slideObject.content = editedContent;
    };

    return (
        <svg
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            pointerEvents="all"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            onDoubleClick={handleTextDoubleClick}
        >
            {isEditing ? (
                <foreignObject
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                >
                    <div
                        ref={contentEditableRef}
                        contentEditable
                        onInput={handleInput}
                        onBlur={handleBlur}
                        style={{
                            width: '100%',
                            height: '100%',
                            outline: 'none',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            ...styleToCSSObject(style),
                        }}
                        dangerouslySetInnerHTML={{__html: contentToHTML(editedContent)}}
                    />
                </foreignObject>
            ) : (
                <foreignObject width={width}
                               height={height} style={{
                    outline: 'none',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    ...styleToCSSObject(style),
                }}
                onMouseDown={onMouseDown}
                >
                    <div dangerouslySetInnerHTML={{__html: contentToHTML(editedContent)}}/>
                </foreignObject>
            )}
        </svg>
    );
};

const styleToCSSObject = (style: TextStyle): React.CSSProperties => {
    const css: React.CSSProperties = {};
    if (style.color) css.color = style.color;
    if (style.fontSize) css.fontSize = `${style.fontSize}px`;
    if (style.fontWeight) css.fontWeight = style.fontWeight;
    if (style.fontStyle) css.fontStyle = style.fontStyle;
    if (style.textDecoration) css.textDecoration = style.textDecoration;
    if (style.fontFamily) css.fontFamily = style.fontFamily;
    if (style.lineHeight) css.lineHeight = style.lineHeight;
    if (style.letterSpacing) css.letterSpacing = style.letterSpacing;
    return css;
};