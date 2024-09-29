// App.tsx
import {useState} from 'react';
import {Button} from './view/components/Button/Button';
import {Input} from './view/components/Input/Input';
import {TextArea} from './view/components/TextArea/TextArea';
import {RadioGroup} from './view/components/RadioGroup/RadioGroup';
import {Select, SelectOption} from './view/components/Select/Select';
import {Checkbox} from './view/components/Checkbox/Checkbox';
import {Switch} from './view/components/Switch/Switch';
import {Slider} from './view/components/Slider/Slider';
import {Modal} from './view/components/Modal/Modal';
import {Tooltip} from './view/components/Tooltip/Tooltip';
import {Accordion} from './view/components/Accordion/Accordion';
import {Tabs} from './view/components/Tabs/Tabs';
import {Breadcrumb} from './view/components/Breadcrumb/Breadcrumb';
import {Pagination} from './view/components/Pagination/Pagination';
import exampleIcon from '../public/icon.svg';

function App() {
    // Состояния для компонентов
    const [inputValue, setInputValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [radioValue, setRadioValue] = useState<string | number>('option1');
    const [selectValue, setSelectValue] = useState<SelectOption | undefined>(undefined);
    const [multiSelectValue, setMultiSelectValue] = useState<SelectOption[]>([]);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Опции для компонентов
    const options: SelectOption[] = [
        {label: 'Опция 1', value: 'option1'},
        {label: 'Опция 2', value: 'option2'},
        {label: 'Опция 3', value: 'option3'},
    ];

    const radioOptions = [
        {label: 'Опция 1', value: 'option1'},
        {label: 'Опция 2', value: 'option2'},
        {label: 'Опция 3', value: 'option3', disabled: true},
    ];

    // Элементы для аккордеона
    const accordionItems = [
        {title: 'Заголовок 1', content: 'Содержимое 1'},
        {title: 'Заголовок 2', content: 'Содержимое 2'},
        {title: 'Заголовок 3', content: 'Содержимое 3'},
    ];

    // Элементы для вкладок
    const tabsItems = [
        {label: 'Вкладка 1', content: 'Контент вкладки 1'},
        {label: 'Вкладка 2', content: 'Контент вкладки 2'},
        {label: 'Вкладка 3', content: 'Контент вкладки 3'},
    ];

    // Элементы для хлебных крошек
    const breadcrumbItems = [
        {label: 'Главная', href: '/'},
        {label: 'Категория', href: '/category'},
        {label: 'Текущая страница'},
    ];

    return (
        <div style={{padding: '2rem'}}>
            {/* Button с иконкой и текстом */}
            <Button
                onClick={() => alert('Клик по кнопке с иконкой слева')}
                iconSrc={exampleIcon}
                iconPosition="left"
                color="#4CAF50"
                textColor="#fff"
            >
                Кнопка с иконкой
            </Button>

            {/* Button только с иконкой */}
            <Button
                onClick={() => alert('Клик по кнопке с иконкой')}
                iconSrc={exampleIcon}
                color="#f44336"
            />

            {/* Button только с текстом */}
            <Button
                onClick={() => alert('Клик по кнопке с текстом')}
                color="#008CBA"
                textColor="#fff"
            >
                Кнопка с текстом
            </Button>

            {/* Input */}
            <div style={{marginTop: '1rem'}}>
                <Input
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Введите текст"
                />
                <p>Вы ввели: {inputValue}</p>
            </div>

            {/* TextArea */}
            <div style={{marginTop: '1rem'}}>
                <TextArea
                    value={textAreaValue}
                    onChange={setTextAreaValue}
                    placeholder="Введите многострочный текст"
                />
                <p>Вы ввели: {textAreaValue}</p>
            </div>

            {/* Обновленный RadioGroup */}
            <div style={{marginTop: '1rem'}}>
                <RadioGroup
                    options={radioOptions}
                    value={radioValue}
                    onChange={setRadioValue}
                />
                <p>Вы выбрали: {radioValue}</p>
            </div>

            {/* Select (Single Select) */}
            <div style={{marginTop: '1rem'}}>
                <Select
                    options={options}
                    value={selectValue}
                    onChange={setSelectValue}
                />
                <p>Вы выбрали: {selectValue?.label}</p>
            </div>

            {/* Select (Multiple Select) */}
            <div style={{marginTop: '1rem'}}>
                <Select
                    multiple
                    options={options}
                    value={multiSelectValue}
                    onChange={setMultiSelectValue}
                />
                <p>Вы выбрали: {multiSelectValue.map((option) => option.label).join(', ')}</p>
            </div>

            {/* Checkbox */}
            <div style={{marginTop: '1rem'}}>
                <Checkbox
                    label="Согласен с условиями"
                    checked={checkboxChecked}
                    onChange={setCheckboxChecked}
                />
                <p>Флажок: {checkboxChecked ? 'Отмечен' : 'Не отмечен'}</p>
            </div>

            {/* Switch */}
            <div style={{marginTop: '1rem'}}>
                <Switch
                    checked={switchChecked}
                    onChange={setSwitchChecked}
                />
                <p>Переключатель: {switchChecked ? 'Включен' : 'Выключен'}</p>
            </div>

            {/* Slider */}
            <div style={{marginTop: '1rem'}}>
                <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    min={0}
                    max={100}
                />
                <p>Значение ползунка: {sliderValue}</p>
            </div>


            {/* Modal */}
            <div style={{marginTop: '1rem'}}>
                <Button onClick={() => setIsModalOpen(true)} color="#6200EE" textColor="#fff">
                    Открыть модальное окно
                </Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2>Модальное окно</h2>
                    <p>Это пример модального окна.</p>
                    <Button onClick={() => setIsModalOpen(false)} color="#f44336" textColor="#fff">
                        Закрыть
                    </Button>
                </Modal>
            </div>

            {/* Tooltip */}
            <div style={{marginTop: '1rem'}}>
                <Tooltip content="Это подсказка">
                    <Button color="#9C27B0" textColor="#fff" onClick={() => alert('Клик по кнопке c наведением')}>
                        Наведите на меня
                    </Button>
                </Tooltip>
            </div>

            {/* Accordion */}
            <div style={{marginTop: '1rem'}}>
                <Accordion items={accordionItems}/>
            </div>

            {/* Tabs */}
            <div style={{marginTop: '1rem'}}>
                <Tabs items={tabsItems}/>
            </div>

            {/* Breadcrumb */}
            <div style={{marginTop: '1rem'}}>
                <Breadcrumb items={breadcrumbItems}/>
            </div>

            {/* Pagination */}
            <div style={{marginTop: '1rem'}}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={5}
                    onPageChange={setCurrentPage}
                />
                <p>Текущая страница: {currentPage}</p>
            </div>
        </div>
    );
}

export default App;
