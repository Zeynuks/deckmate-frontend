import {
    Size,
    TextObject,
    TextSpan,
    TextStyle,
} from '../../../store/types';

//TODO: Переработать TextObject

type TextObjectProps = {
    object: TextObject,
    data: Size,
    onEdit?: () => void,
};

export const TextComponent: React.FC<TextObjectProps> = ({
                                                             object,
                                                             data
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
        if (style.textDecoration) css.push(`text-decoration: ${style.textDecoration}`);
        if (style.fontFamily) css.push(`font-family: ${style.fontFamily}`);
        return css.join('; ');
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
                {<foreignObject
                    width={data.width}
                    height={data.height}
                    style={{pointerEvents: 'none'}}
                    onDoubleClick={() => alert()}
                >
                    <p
                        contentEditable
                        style={{
                            outline: 'none',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            ...styleToCSSObject(object.style),
                        }}
                        dangerouslySetInnerHTML={{__html: contentToHTML(object.content)}}
                    />
                </foreignObject>}

                <foreignObject
                    width={data.width}
                    height={data.height}
                    style={{
                        outline: 'none',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        ...styleToCSSObject(object.style),
                    }}
                >
                    <p dangerouslySetInnerHTML={{__html: contentToHTML(object.content)}}/>
                </foreignObject>
            </g>
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