export enum ObjectType {
    Text = 'text',
    Image = 'image',
    Ellipse = 'ellipse',
    Rectangle = 'rectangle',
    Triangle = 'triangle',
    CustomShape = 'custom-shape',
}

export enum BackgroundType {
    Image = 'image',
    Color = 'color',
}

export enum FontWeight {
    W100 = 100,
    W200 = 200,
    W300 = 300,
    W400 = 400,
    W500 = 500,
    W600 = 600,
    W700 = 700,
    W800 = 800,
    W900 = 900,
}

export enum FontStyle {
    Normal = 'normal',
    Italic = 'italic',
    Oblique = 'oblique',
}

export enum TextHorizontalAlign {
    Left = 'left',
    Middle = 'middle',
    Right = 'right',
}

export enum TextVerticalAlign {
    Top = 'top',
    Middle = 'middle',
    Bottom = 'bottom',
}

// ----------------------------
// Basic Types
// ----------------------------

export interface Size {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

export type CSSColor =
    | `#${string}`
    | `rgb(${number},${number},${number})`
    | `rgba(${number},${number},${number},${number})`
    | `hsl(${number},${number}%,${number}%)`
    | `hsla(${number},${number}%,${number}%,${number})`
    | `hsla(${number},${number}%,${number}%,${number}%)`;

// ----------------------------
// Slide Objects
// ----------------------------

export interface SlideBaseObject {
    id: string;
    size: Size;
    position: Position;
    angle: number;
}

export interface TextObject extends SlideBaseObject {
    type: ObjectType.Text;
    lines: TextLine[];
    verticalAlign: TextVerticalAlign;
}

export interface TextLine {
    id: string;
    horizontalAlign: TextHorizontalAlign;
    spans: TextSpan[];
}

export interface TextSpan {
    id: string;
    text: string;
    style: TextStyle;
}

export interface TextStyle {
    fontSize: number;
    fontFamily: string;
    fontWeight: FontWeight;
    fontStyle: FontStyle;
    underline: boolean;
    overline: boolean;
    color: CSSColor;
    backgroundColor: CSSColor | 'none';
}

export interface ImageObjectBase {
    type: ObjectType.Image;
    src: string;
    altText?: string;
}

export interface ImageObject extends SlideBaseObject, ImageObjectBase {}

export interface EllipseObject extends SlideBaseObject {
    type: ObjectType.Ellipse;
    radiusX: number;
    radiusY: number;
    style: ShapeStyle;
}

export interface RectangleObject extends SlideBaseObject {
    type: ObjectType.Rectangle;
    cornerRadius?: number;
    style: ShapeStyle;
}

export interface TriangleObject extends SlideBaseObject {
    type: ObjectType.Triangle;
    style: ShapeStyle;
}

export interface BezierPoint {
    x: number;
    y: number;
    type: 'moveTo' | 'lineTo' | 'curveTo';
    controlPoints?: BezierPoint[];
}

export interface CustomShapeObject extends SlideBaseObject {
    type: ObjectType.CustomShape;
    points: BezierPoint[];
    style: ShapeStyle;
}

export interface ShapeStyle {
    fillColor?: CSSColor;
    strokeColor?: CSSColor;
    strokeWidth?: number;
}

export type SlideObject =
    | TextObject
    | ImageObject
    | EllipseObject
    | RectangleObject
    | TriangleObject
    | CustomShapeObject;

// ----------------------------
// Background Types
// ----------------------------

export interface BackgroundColor {
    type: BackgroundType.Color;
    color: CSSColor;
}

export interface BackgroundImage {
    type: BackgroundType.Image;
    src: string;
    altText?: string;
}

export type Background = BackgroundImage | BackgroundColor;

export interface Slide {
    id: string;
    size: Size;
    background: Background;
    objects: SlideObject[];
}

export interface Presentation {
    title: string;
    slides: Slide[];
}

export interface Selected {
    slide?: string;
    objects: string[];
}

export interface PresentationData {
    scaleFactor: number;
    slideSize: Size;
}

export interface Editor {
    presentation: Presentation;
    data: PresentationData;
    selected: Selected;
}
