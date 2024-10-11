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
    rotation: number
};

export type TextObject = SlideObject & {
    type: ObjectType.Text;
    content: string;
    fontSize: number;
    fontFamily: string;
    fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: number;
    color?: CSSColor;
};

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

