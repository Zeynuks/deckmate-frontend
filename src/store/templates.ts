import {v4 as uuidv4} from 'uuid';
import {
    Editor,
    Presentation,
    PresentationData,
    Selected,
    BackgroundType,
    ObjectType,
    TextHorizontalAlign,
    TextVerticalAlign,
    FontWeight,
    FontStyle,
} from './types';

const presentation: Presentation = {
    title: 'Уникальная Презентация с Разнообразным Текстом',
    slides: [
        {
            id: uuidv4(),
            size: {width: 1920, height: 1080},
            background: {
                type: BackgroundType.Color,
                color: '#FFFFFF',
            },
            objects: [
                // Первый текстовый объект
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 800, height: 400},
                    position: {x: 100, y: 150},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Middle, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Добро пожаловать в нашу презентацию!',
                                    style: {
                                        fontSize: 28,
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: FontWeight.W700,
                                        fontStyle: FontStyle.Normal,
                                        underline: true,
                                        overline: false,
                                        color: '#2C3E50',
                                        backgroundColor: '#ECF0F1',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: ' Мы рады видеть вас здесь.',
                                    style: {
                                        fontSize: 24,
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Italic,
                                        underline: false,
                                        overline: false,
                                        color: '#E74C3C',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Middle,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Этот текст выровнен по центру и имеет разнообразные стили.',
                                    style: {
                                        fontSize: 26,
                                        fontFamily: 'Nunito, sans-serif',
                                        fontWeight: FontWeight.W600,
                                        fontStyle: FontStyle.Italic,
                                        underline: false,
                                        overline: true,
                                        color: '#2980B9',
                                        backgroundColor: '#FDEDEC',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Right,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Заключительный абзац с правым выравниванием.',
                                    style: {
                                        fontSize: 22,
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: FontWeight.W500,
                                        fontStyle: FontStyle.Normal,
                                        underline: true,
                                        overline: false,
                                        color: '#27AE60',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                    ],
                },
                // Второй текстовый объект
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 600, height: 200},
                    position: {x: 100, y: 600},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Top, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Middle,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Текстовый объект с увеличенным шрифтом и жирным начертанием.',
                                    style: {
                                        fontSize: 30,
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: FontWeight.W800,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#8E44AD',
                                        backgroundColor: '#F5EEF8',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Right,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Строка с правым выравниванием и курсивом.',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Georgia, serif',
                                        fontWeight: FontWeight.W600,
                                        fontStyle: FontStyle.Italic,
                                        underline: false,
                                        overline: false,
                                        color: '#D35400',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                    ],
                },
                // Третий текстовый объект с разноцветными спанами
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 700, height: 300},
                    position: {x: 1200, y: 200},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Middle, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Разноцветный ',
                                    style: {
                                        fontSize: 24,
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#1ABC9C',
                                        backgroundColor: 'none',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: 'текст ',
                                    style: {
                                        fontSize: 24,
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: FontWeight.W700,
                                        fontStyle: FontStyle.Italic,
                                        underline: true,
                                        overline: false,
                                        color: '#3498DB',
                                        backgroundColor: '#D6EAF8',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: 'с различными ',
                                    style: {
                                        fontSize: 24,
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#E67E22',
                                        backgroundColor: 'none',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: 'стилями.',
                                    style: {
                                        fontSize: 24,
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: FontWeight.W500,
                                        fontStyle: FontStyle.Oblique,
                                        underline: false,
                                        overline: true,
                                        color: '#9B59B6',
                                        backgroundColor: '#F4ECF7',
                                    },
                                },
                            ],
                        },
                    ],
                },
                // Четвёртый текстовый объект с подчёркиванием и цветом фона
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 500, height: 150},
                    position: {x: 1600, y: 700},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Bottom, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Middle,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Подчёркнутый текст',
                                    style: {
                                        fontSize: 22,
                                        fontFamily: 'Courier New, monospace',
                                        fontWeight: FontWeight.W600,
                                        fontStyle: FontStyle.Normal,
                                        underline: true,
                                        overline: false,
                                        color: '#34495E',
                                        backgroundColor: '#ECF0F1',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: ' с фоновым цветом.',
                                    style: {
                                        fontSize: 22,
                                        fontFamily: 'Courier New, monospace',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#2ECC71',
                                        backgroundColor: '#D5F5E3',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        // Второй слайд с разнообразным текстом
        {
            id: uuidv4(),
            size: {width: 1920, height: 1080},
            background: {
                type: BackgroundType.Color,
                color: '#F0F0F0',
            },
            objects: [
                // Пятый текстовый объект
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 900, height: 500},
                    position: {x: 500, y: 300},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Middle, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Пример текста с разными цветами и шрифтами. ',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Verdana, sans-serif',
                                        fontWeight: FontWeight.W500,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#E74C3C',
                                        backgroundColor: 'none',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: 'Этот фрагмент выделен жирным.',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Verdana, sans-serif',
                                        fontWeight: FontWeight.W700,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#2980B9',
                                        backgroundColor: 'none',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: ' А этот курсивный.',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Verdana, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Italic,
                                        underline: false,
                                        overline: false,
                                        color: '#27AE60',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Middle,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Центрированный текст с подчёркиванием.',
                                    style: {
                                        fontSize: 22,
                                        fontFamily: 'Times New Roman, serif',
                                        fontWeight: FontWeight.W600,
                                        fontStyle: FontStyle.Normal,
                                        underline: true,
                                        overline: false,
                                        color: '#8E44AD',
                                        backgroundColor: '#F4ECF7',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Right,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Текст выровнен вправо и имеет фон.',
                                    style: {
                                        fontSize: 18,
                                        fontFamily: 'Tahoma, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#16A085',
                                        backgroundColor: '#D6EAF8',
                                    },
                                },
                            ],
                        },
                    ],
                },
                // Шестой текстовый объект с разноцветными подзаголовками
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 800, height: 300},
                    position: {x: 1200, y: 600},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Middle, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Заголовок первого уровня',
                                    style: {
                                        fontSize: 26,
                                        fontFamily: 'Helvetica, sans-serif',
                                        fontWeight: FontWeight.W700,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#2C3E50',
                                        backgroundColor: '#BDC3C7',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Подзаголовок с курсивом и цветом.',
                                    style: {
                                        fontSize: 22,
                                        fontFamily: 'Helvetica, sans-serif',
                                        fontWeight: FontWeight.W600,
                                        fontStyle: FontStyle.Italic,
                                        underline: false,
                                        overline: false,
                                        color: '#E67E22',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Основной текст с разными стилями и цветами.',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Helvetica, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#34495E',
                                        backgroundColor: '#ECF0F1',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        // Третий слайд с дополнительными текстовыми объектами
        {
            id: uuidv4(),
            size: {width: 1920, height: 1080},
            background: {
                type: BackgroundType.Color,
                color: '#2C3E50',
            },
            objects: [
                // Седьмой текстовый объект с белым текстом на тёмном фоне
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 1000, height: 400},
                    position: {x: 460, y: 340},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Middle, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Middle,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Тёмный фон и светлый текст.',
                                    style: {
                                        fontSize: 28,
                                        fontFamily: 'Impact, Charcoal, sans-serif',
                                        fontWeight: FontWeight.W900,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#ECF0F1',
                                        backgroundColor: '#2C3E50',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Middle,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Использование ярких цветов для выделения.',
                                    style: {
                                        fontSize: 24,
                                        fontFamily: 'Impact, Charcoal, sans-serif',
                                        fontWeight: FontWeight.W700,
                                        fontStyle: FontStyle.Italic,
                                        underline: true,
                                        overline: false,
                                        color: '#E74C3C',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                    ],
                },
                // Восьмой текстовый объект с разношрифтовыми спанами
                {
                    id: uuidv4(),
                    type: ObjectType.Text,
                    size: {width: 800, height: 300},
                    position: {x: 800, y: 700},
                    angle: 0,
                    verticalAlign: TextVerticalAlign.Middle, // Обязательное поле
                    lines: [
                        {
                            id: uuidv4(),
                            horizontalAlign: TextHorizontalAlign.Left,
                            spans: [
                                {
                                    id: uuidv4(),
                                    text: 'Шрифт Arial, ',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: FontWeight.W400,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#1ABC9C',
                                        backgroundColor: 'none',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: 'Times New Roman, ',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Times New Roman, serif',
                                        fontWeight: FontWeight.W600,
                                        fontStyle: FontStyle.Normal,
                                        underline: false,
                                        overline: false,
                                        color: '#9B59B6',
                                        backgroundColor: '#F4ECF7',
                                    },
                                },
                                {
                                    id: uuidv4(),
                                    text: 'Courier New.',
                                    style: {
                                        fontSize: 20,
                                        fontFamily: 'Courier New, monospace',
                                        fontWeight: FontWeight.W500,
                                        fontStyle: FontStyle.Italic,
                                        underline: false,
                                        overline: false,
                                        color: '#E67E22',
                                        backgroundColor: 'none',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    ]
};

const selected: Selected = {
    slide: presentation.slides[0].id,
    objects: [],
};

const data: PresentationData = {
    scaleFactor: 1,
    slideSize: {width: 1920, height: 1080},
};

export const defaultEditor: Editor = {
    presentation,
    data,
    selected,
};

