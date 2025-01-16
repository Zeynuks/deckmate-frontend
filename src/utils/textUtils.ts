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

export function linesToHTML(textObj: TextObject): string {
    return textObj.lines
        .map((line) => {
            const align = mapHorizontalAlign(line.horizontalAlign);
            const spansHTML = line.spans
                .map((span) => {
                    const finalStyle = span.style;
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

export function parseHTMLtoTextObject(html: string, baseObject: TextObject): TextObject {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const hiddenWrapper = document.createElement('div');
    hiddenWrapper.style.position = 'absolute';
    hiddenWrapper.style.visibility = 'hidden';
    hiddenWrapper.style.pointerEvents = 'none';
    document.body.appendChild(hiddenWrapper);
    hiddenWrapper.appendChild(tempDiv);
    const divs = Array.from(tempDiv.children) as HTMLDivElement[];
    const newLines: TextLine[] = [];
    if (divs.length === 0) {
        newLines.push({
            id: uuidv4(),
            horizontalAlign: baseObject.lines[0]?.horizontalAlign ?? TextHorizontalAlign.Left,
            spans: parseChildNodes(tempDiv, getDefaultTextStyle()),
        });
    } else {
        divs.forEach((div, i) => {
            const lineAlign = readTextAlign(getComputedStyle(div).textAlign)
                ?? baseObject.lines[i]?.horizontalAlign
                ?? baseObject.lines[0]?.horizontalAlign
                ?? TextHorizontalAlign.Left;
            newLines.push({
                id: uuidv4(),
                horizontalAlign: lineAlign,
                spans: parseChildNodes(div, getDefaultTextStyle()),
            });
        });
    }
    document.body.removeChild(hiddenWrapper);
    console.log('Edit', newLines);
    return {
        ...baseObject,
        lines: newLines,
    };
}

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

function parseChildNodes(element: HTMLElement, parentStyle: TextStyle): TextSpan[] {
    const spans: TextSpan[] = [];
    let currentSpan: TextSpan | null = null;
    element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? '';
            if (text) {
                if (!currentSpan) {
                    currentSpan = {
                        id: uuidv4(),
                        text: '',
                        style: { ...parentStyle },
                    };
                    spans.push(currentSpan);
                }
                currentSpan.text += text;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName.toLowerCase();
            if (tag === 'br') {
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
                const childSpans = parseChildNodes(el, parentStyle);
                spans.push(...childSpans);
                currentSpan = childSpans[childSpans.length - 1] || currentSpan;
            } else {
                const newStyle = applyTagStyle(parentStyle, el);
                const childSpans = parseChildNodes(el, newStyle);
                spans.push(...childSpans);
                currentSpan = childSpans[childSpans.length - 1] || currentSpan;
            }
        }
    });
    return spans;
}

function applyTagStyle(parentStyle: TextStyle, el: HTMLElement): TextStyle {
    let style = { ...parentStyle };
    const tag = el.tagName.toLowerCase();
    if (tag === 'b' || tag === 'strong') {
        style.fontWeight = FontWeight.W700;
    }
    if (tag === 'i' || tag === 'em') {
        style.fontStyle = FontStyle.Italic;
    }
    if (tag === 'u') {
        style.underline = true;
    }
    style = mergeStyles(style, extractComputedStyle(el));
    return style;
}

function extractComputedStyle(el: HTMLElement): Partial<TextStyle> {
    const s = window.getComputedStyle(el);
    const style: Partial<TextStyle> = {};
    if (s.fontSize) {
        const fs = parseInt(s.fontSize, 10);
        if (!isNaN(fs)) style.fontSize = fs;
    }
    if (s.fontWeight) {
        const numericWeight = parseInt(s.fontWeight, 10);
        if (!isNaN(numericWeight)) {
            style.fontWeight = numericWeight as FontWeight;
        } else if (s.fontWeight === 'bold') {
            style.fontWeight = FontWeight.W700;
        }
    }
    if (s.fontStyle && s.fontStyle !== 'normal') {
        if (Object.values(FontStyle).includes(s.fontStyle as FontStyle)) {
            style.fontStyle = s.fontStyle as FontStyle;
        }
    }
    const decor = s.textDecorationLine || s.textDecoration || '';
    if (decor) {
        style.underline = decor.includes('underline');
        style.overline = decor.includes('overline');
    }
    if (s.color) {
        style.color = s.color as CSSColor;
    }
    if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') {
        style.backgroundColor = s.backgroundColor as CSSColor;
    }
    if (s.fontFamily) {
        style.fontFamily = s.fontFamily;
    }
    return style;
}
