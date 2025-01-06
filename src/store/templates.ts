import {v4 as uuidv4} from 'uuid';
import {
    BackgroundType,
    Editor, FontStyle,
    FontWeight,
    ObjectType,
    Position,
    Presentation,
    PresentationData,
    Selected,
    Size, TextHorizontalAlign, TextStyle, TextVerticalAlign
} from './types';

const presentation: Presentation = {
    title: 'Full Presentation',
    slides: [
        {
            id: uuidv4(),
            size: {
                width: 1920,
                height: 1080
            },
            background: {
                type: BackgroundType.Color,
                color: '#FFFFFF'
            },
            objects: [{
                id: 'text1',
                type: ObjectType.Text,
                size: { width: 600, height: 300 } as Size,
                position: { x: 50, y: 100 } as Position,
                angle: 0,
                content: [
                    {
                        text: 'Привет, ',
                        style: {
                            fontSize: 24,
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: FontWeight.W400,
                            fontStyle: FontStyle.Normal,
                            underline: false,
                            overline: false,
                            horizontalAlign: TextHorizontalAlign.Left,
                            color: '#333333',
                        } as TextStyle,
                    },
                    {
                        text: 'мир!',
                        style: {
                            fontSize: 24,
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: FontWeight.W700,
                            fontStyle: FontStyle.Italic,
                            underline: true,
                            overline: false,
                            horizontalAlign: TextHorizontalAlign.Left,
                            color: 'rgb(255, 0, 0)',
                        } as TextStyle,
                    },
                    {
                        text: ' Это пример rich text с разными стилями.',
                        style: {
                            fontSize: 18,
                            fontFamily: 'Times New Roman, serif',
                            fontWeight: FontWeight.W300,
                            fontStyle: FontStyle.Oblique,
                            horizontalAlign: TextHorizontalAlign.Left,
                            color: 'hsl(120, 100%, 40%)',
                            backgroundColor: 'rgba(0, 0, 255, 0.1)',
                        } as TextStyle,
                    },
                ],
                style: {
                    fontSize: 24,
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: FontWeight.W400,
                    fontStyle: FontStyle.Normal,
                    underline: false,
                    overline: false, // Assuming no direct equivalent for LineThrough
                    horizontalAlign: TextHorizontalAlign.Left,
                    verticalAlign: TextVerticalAlign.Middle,
                    color: '#333333',
                    backgroundColor: '#FFFFFF', // Added missing backgroundColor property with default value
                },
            }]
        },
        {
            id: uuidv4(),
            size: {
                width: 1920,
                height: 1080
            },
            background: {
                type: BackgroundType.Color,
                color: '#FFFFFF'
            },
            objects: []
        }
    ]
};

const selected: Selected = {
    slide: presentation.slides[0].id,
    objects: [] as string[]
};

const data: PresentationData = {
    scaleFactor: 1,
    slideSize: {width: 1920, height: 1080}
};

export const defaultEditor: Editor = {
    presentation,
    data,
    selected
};