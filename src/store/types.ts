export type Size = { width: number; height: number; };
export type Position = { x: number; y: number };
export type CSSColor =
    | `#${string}`
    | `rgb(${number},${number},${number})`
    | `rgba(${number},${number},${number},${number})`
    | `hsl(${number},${number}%,${number}%)`
    | `hsla(${number},${number}%,${number}%,${number})`
    | `${string}`;

export enum ObjectType {
    Text = 'text',
    Image = 'image',
}

export type SlideID = string & { __brand: 'SlideID' };
export type ObjectID = string & { __brand: 'ObjectID' };

export type SlideObject = {
    id: ObjectID;
    size: Size;
    position: Position;
    angle: number
};

export interface TextStyle {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: FontWeight;
    fontStyle?: FontStyle;
    textDecoration?: TextDecoration;
    textHorizontalAlign?: TextHorizontalAlign;
    textVerticalAlign?: TextVerticalAlign;
    lineHeight?: number;
    letterSpacing?: number;
    color?: CSSColor;
    backgroundColor?: CSSColor;
}

export type TextSpan = {
    text: string;
    style?: TextStyle;
};

export interface TextObject extends SlideObject {
    type: ObjectType.Text;
    content: TextSpan[];
    style: TextStyle;
}

export enum FontWeight {
    Normal = 'normal',
    Bold = 'bold',
    Lighter = 'lighter',
    Bolder = 'bolder',
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

export enum TextDecoration {
    None = 'none',
    Underline = 'underline',
    Overline = 'overline',
    LineThrough = 'line-through',
}

export enum TextHorizontalAlign {
    Left = 'left',
    Middle = 'middle',
    Right = 'right',
}

export enum TextVerticalAlign {
    Justify = 'justify',
    Start = 'start',
    End = 'end',
}


export type Image = {
    src: string;
};

export type ImageBackground = Image & {
    type: 'image';
}

export type ColorBackground = {
    type: 'color';
    color: CSSColor;
}

export type ImageObject = SlideObject & Image & {
    type: ObjectType.Image;
    altText?: string;
};

export type Background = ImageBackground | ColorBackground;

export type Slide = {
    id: SlideID;
    size: Size;
    background: Background;
    objects: (TextObject | ImageObject)[];
};

export type Presentation = {
    title: string;
    slides: Slide[];
};

export type Selected = {
    slideId: SlideID;
    objectId: ObjectID[];
};

export type Editor = {
    presentation: Presentation;
    selected: Selected;
}

