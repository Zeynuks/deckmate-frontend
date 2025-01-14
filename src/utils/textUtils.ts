import { v4 as uuidv4 } from 'uuid';
import {
    TextObject,
    TextLine,
    TextSpan,
    TextStyle,
    FontWeight,
    FontStyle,
    TextHorizontalAlign,
    CSSColor,
} from '../store/types';

/** Возвращает дефолтный полный стиль. */
function getDefaultTextStyle(): TextStyle {
    return {
        fontSize: 16,
        fontFamily: 'Arial, sans-serif',
        fontWeight: FontWeight.W400,
        fontStyle: FontStyle.Normal,
        underline: false,
        overline: false,
        color: '#000000',
        backgroundColor: 'none',
    };
}

/** Объединяет два «полных» стиля в один. */
function mergeStyles(base: TextStyle, override: Partial<TextStyle>): TextStyle {
    return {
        fontSize: override.fontSize ?? base.fontSize,
        fontFamily: override.fontFamily ?? base.fontFamily,
        fontWeight: override.fontWeight ?? base.fontWeight,
        fontStyle: override.fontStyle ?? base.fontStyle,
        underline: override.underline ?? base.underline,
        overline: override.overline ?? base.overline,
        color: override.color ?? base.color,
        backgroundColor: override.backgroundColor ?? base.backgroundColor,
    };
}

/** Превращает TextStyle -> inline-CSS string */
function styleToCSS(s: TextStyle): string {
    const css: string[] = [];
    css.push(`font-size:${s.fontSize}px`);
    css.push(`font-weight:${s.fontWeight}`);
    css.push(`font-style:${s.fontStyle}`);

    let td = '';
    if (s.underline) td += ' underline';
    if (s.overline) td += ' overline';
    if (td) css.push(`text-decoration:${td.trim()}`);

    css.push(`color:${s.color}`);

    if (s.backgroundColor && s.backgroundColor !== 'none') {
        css.push(`background-color:${s.backgroundColor}`);
    }

    css.push(`font-family:${s.fontFamily}`);

    return css.join(';');
}

/** Мапим TextHorizontalAlign -> 'left'|'center'|'right' */
function mapHorizontalAlign(ha: TextHorizontalAlign): 'left' | 'center' | 'right' {
    switch (ha) {
        case TextHorizontalAlign.Left:
            return 'left';
        case TextHorizontalAlign.Middle:
            return 'center';
        case TextHorizontalAlign.Right:
            return 'right';
        default:
            return 'left';
    }
}

/** Экранируем спецсимволы для безопасного HTML. */
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Генерация HTML (TextObject -> HTML).
 * - Для каждой строки берём line.spans
 * - Спан мержит (дефолтный стиль + что в `span.style`),
 * - Превращаем в <span style="...">text</span>.
 */
export function linesToHTML(textObj: TextObject): string {
    return textObj.lines
        .map((line) => {
            const align = mapHorizontalAlign(line.horizontalAlign);

            const spansHTML = line.spans
                .map((span) => {
                    // Поскольку каждый TextSpan содержит полный TextStyle, можно использовать его напрямую
                    const finalStyle = span.style;

                    // Экранирование и <br/> вместо \n
                    const safeText = span.text
                        .split('\n')
                        .map(escapeHtml)
                        .join('<br/>');

                    return `<span style="${styleToCSS(finalStyle)}">${safeText}</span>`;
                })
                .join('');

            return `<div style="text-align:${align};">${spansHTML}</div>`;
        })
        .join('');
}

/**
 * Парсит HTML (из <div contentEditable>) обратно в TextObject.
 * Для упрощения используем div.childNodes -> каждый <div> это отдельная TextLine.
 * Внутри div -> childNodes -> TextSpan. При этом сохраняем/накапливаем стили.
 */
export function parseHTMLtoTextObject(html: string, baseObject: TextObject): TextObject {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const divs = Array.from(tempDiv.children) as HTMLDivElement[];
    const newLines: TextLine[] = [];

    // Если внутри tempDiv нет <div> (child), значит, всё в одной строке.
    if (divs.length === 0) {
        newLines.push({
            id: uuidv4(),
            horizontalAlign: baseObject.lines[0]?.horizontalAlign ?? TextHorizontalAlign.Left,
            spans: parseChildNodes(tempDiv, getDefaultTextStyle()),
        });
    } else {
        divs.forEach((div, i) => {
            const lineAlign =
                readTextAlign(div.style.textAlign) ??
                baseObject.lines[i]?.horizontalAlign ??
                baseObject.lines[0]?.horizontalAlign ??
                TextHorizontalAlign.Left;

            newLines.push({
                id: uuidv4(),
                horizontalAlign: lineAlign,
                spans: parseChildNodes(div, getDefaultTextStyle()),
            });
        });
    }

    console.log('Edit', newLines);
    return {
        ...baseObject,
        lines: newLines,
    };
}

/**
 * Рекурсивно обходим childNodes элемента. Накапливаем стили (стек).
 * `parentStyle` – это стиль, унаследованный от родителей.
 */
function parseChildNodes(element: HTMLElement, parentStyle: TextStyle): TextSpan[] {
    const spans: TextSpan[] = [];
    let currentSpan: TextSpan | null = null;

    element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Узел-текст
            const text = node.textContent ?? '';
            if (text) {
                if (!currentSpan) {
                    currentSpan = {
                        id: uuidv4(),
                        text: '',
                        style: { ...parentStyle }, // Копируем parentStyle
                    };
                    spans.push(currentSpan);
                }
                currentSpan.text += text;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName.toLowerCase();

            if (tag === 'br') {
                // Перенос строки
                if (currentSpan) {
                    currentSpan.text += '\n';
                } else {
                    spans.push({
                        id: uuidv4(),
                        text: '\n',
                        style: { ...parentStyle },
                    });
                }
            } else if (tag === 'div') {
                // div внутри div: рекурсивно
                const childSpans = parseChildNodes(el, { ...parentStyle });
                spans.push(...childSpans);
                currentSpan = childSpans[childSpans.length - 1] || currentSpan;
            } else {
                // Для span, b, i, u, strong, em и т.п.
                const newStyle = applyTagStyle(parentStyle, el);
                const childSpans = parseChildNodes(el, newStyle);

                spans.push(...childSpans);
                currentSpan = childSpans[childSpans.length - 1] || currentSpan;
            }
        }
    });

    return spans;
}

/**
 * «Применяем» стиль HTML-тега (и инлайн-стиль) к базовому (parentStyle).
 * - Для <b> / <strong> -> fontWeight = 700
 * - Для <i> / <em> -> fontStyle = italic
 * - Для <u>       -> underline = true
 * - Для <span style="..."> -> extractInlineStyle()
 * - И т.д.
 */
function applyTagStyle(parentStyle: TextStyle, el: HTMLElement): TextStyle {
    const tag = el.tagName.toLowerCase();
    let style = { ...parentStyle };

    // b / strong
    if (tag === 'b' || tag === 'strong') {
        style.fontWeight = FontWeight.W700;
    }
    // i / em
    if (tag === 'i' || tag === 'em') {
        style.fontStyle = FontStyle.Italic;
    }
    // u
    if (tag === 'u') {
        style.underline = true;
    }

    // Дополняем style тем, что извлекли из инлайна
    style = mergeStyles(style, extractInlineStyle(el));

    return style;
}

/**
 * Извлекаем стиль из inline-стиля элемента:
 * возвращаем **Partial<TextStyle>** только с теми полями, что реально прописаны.
 */
function extractInlineStyle(el: HTMLElement): Partial<TextStyle> {
    const s = el.style;
    // Начинаем с пустого объекта, чтобы не перезаписывать родительские стили «дефолтом».
    const style: Partial<TextStyle> = {};

    // font-size
    if (s.fontSize) {
        const fs = parseInt(s.fontSize, 10);
        if (!isNaN(fs)) style.fontSize = fs;
    }

    // font-weight
    if (s.fontWeight) {
        const fw = parseInt(s.fontWeight, 10);
        if (!isNaN(fw)) style.fontWeight = fw as FontWeight;
    }

    // font-style
    if (s.fontStyle) {
        if (Object.values(FontStyle).includes(s.fontStyle as FontStyle)) {
            style.fontStyle = s.fontStyle as FontStyle;
        }
    }

    // text-decoration
    if (s.textDecoration) {
        style.underline = s.textDecoration.includes('underline');
        style.overline = s.textDecoration.includes('overline');
    }

    // color
    if (s.color) {
        style.color = s.color as CSSColor;
    }

    // background-color
    if (s.backgroundColor && s.backgroundColor !== 'none') {
        style.backgroundColor = s.backgroundColor as CSSColor;
    }

    // font-family
    if (s.fontFamily) {
        style.fontFamily = s.fontFamily;
    }

    return style;
}

/**
 * Считываем textAlign, если он есть,
 * и мапим на наш enum TextHorizontalAlign. Если нет, возвращаем undefined.
 */
function readTextAlign(align: string | undefined): TextHorizontalAlign | undefined {
    if (!align) return undefined;
    switch (align) {
        case 'left':
            return TextHorizontalAlign.Left;
        case 'center':
            return TextHorizontalAlign.Middle;
        case 'right':
            return TextHorizontalAlign.Right;
        default:
            return undefined;
    }
}
