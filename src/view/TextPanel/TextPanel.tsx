import styles from './TextPanel.module.css';
import {Button} from '../components/ui/Button/Button.tsx';
import {Typography} from '../components/ui/Typography/Typography.tsx';
import {DropdownOption, InputDropdown} from '../components/ui/InputDropdown/InputDropdown.tsx';
import closeIcon from '../../assets/icons/close-menu.svg';
import {TextObject, FontWeight, TextHorizontalAlign, TextVerticalAlign} from '../../store/types.ts';
import alignVerticalIcon from '../../assets/icons/align/align-vertically.svg';
import alignHorizontalIcon from '../../assets/icons/align/align-horizontally.svg';
import alignLeftIcon from '../../assets/icons/align/align-left.svg';
import alignRightIcon from '../../assets/icons/align/align-right.svg';
import alignStartIcon from '../../assets/icons/align/align-top.svg';
import alignEndIcon from '../../assets/icons/align/align-bottom.svg';
import {dispatch} from '../../store/editor.ts';
import {setFontSize} from '../../store/functions/setFontSize.ts';
import {setFontWeight} from '../../store/functions/setFontWeight.ts';
import {setTextVerticalAlign} from '../../store/functions/setTextVerticalAlign.ts.ts';
import {setTextVerticalAlign} from '../../store/functions/setTextVerticalAlign.ts';
type TextPanelProps = {
    textObject: TextObject;
};

export const TextPanel: React.FC<TextPanelProps> = ({textObject}) => {
    const sizes: DropdownOption[] = [
        {label: '8px', value: 8},
        {label: '9px', value: 9},
        {label: '10px', value: 10},
        {label: '11px', value: 11},
        {label: '12px', value: 12},
        {label: '14px', value: 14},
        {label: '16px', value: 16},
        {label: '18px', value: 18},
        {label: '20px', value: 20},
        {label: '24px', value: 24},
        {label: '28px', value: 28},
        {label: '32px', value: 32},
        {label: '36px', value: 36},
        {label: '40px', value: 40},
        {label: '48px', value: 48},
        {label: '56px', value: 56},
        {label: '64px', value: 64},
        {label: '72px', value: 72},
        {label: '80px', value: 80},
        {label: '96px', value: 96},
    ];

    const fontWeights: DropdownOption[] = [
        {label: 'Normal', value: FontWeight.Normal},
        {label: 'Bold', value: FontWeight.Bold},
        {label: 'Lighter', value: FontWeight.Lighter},
        {label: 'Bolder', value: FontWeight.Bolder},
        {label: '100', value: FontWeight.W100},
        {label: '200', value: FontWeight.W200},
        {label: '300', value: FontWeight.W300},
        {label: '400', value: FontWeight.W400},
        {label: '500', value: FontWeight.W500},
        {label: '600', value: FontWeight.W600},
        {label: '700', value: FontWeight.W700},
        {label: '800', value: FontWeight.W800},
        {label: '900', value: FontWeight.W900},
    ];

    const horizontalAlignments: DropdownOption[] = [
        {label: 'Left', value: TextHorizontalAlign.Left},
        {label: 'Middle', value: TextHorizontalAlign.Middle},
        {label: 'Right', value: TextHorizontalAlign.Right},
    ];

    const verticalAlignments: DropdownOption[] = [
        {label: 'Justify', value: TextVerticalAlign.Justify},
        {label: 'Start', value: TextVerticalAlign.Start},
        {label: 'End', value: TextVerticalAlign.End},
    ];

    return (
        <section className={styles.textPanel}>
            <section className={styles.titleSection}>
                <Typography variant={'menuTitle'}>
                    Text
                </Typography>
                <Button iconSrc={closeIcon} onClick={() => {
                }}/>
            </section>
            <section className={styles.settingSection}>
                <Typography variant={'menuSectionTitle'}>Text Alignment</Typography>
                <div className={styles.alignmentMenu}>
                    <div className={styles.alignmentButtons}>
                        {horizontalAlignments.map((alignment) => (
                            <Button
                                key={alignment.value}
                                iconSrc={getAlignmentIcon(alignment.value)}
                                disabled={textObject.style?.textHorizontalAlign === alignment.value}
                                onClick={() => dispatch(setTextAlign, alignment.value)}
                            />
                        ))}

                    </div>
                    <div className={styles.alignmentButtons}>
                        {verticalAlignments.map((alignment) => (
                            <Button
                                key={alignment.value}
                                iconSrc={getAlignmentIcon(alignment.value)}
                                disabled={textObject.style?.textVerticalAlign === alignment.value}
                                onClick={() => dispatch(setTextAlign, alignment.value)}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <Typography variant={'menuSectionTitle'}>Font Size</Typography>
                    <InputDropdown
                        options={sizes}
                        value={`${textObject.style?.fontSize || 16}px`}
                        onChange={(fontSize) => dispatch(setFontSize, fontSize)}
                        filterOptions={false}
                        allowCustomValue={true}
                    />
                </div>
                <div>
                    <Typography variant={'menuSectionTitle'}>Font Weight</Typography>
                    <InputDropdown
                        options={fontWeights}
                        value={textObject.style?.fontWeight || FontWeight.Normal}
                        onChange={(fontWeight) => dispatch(setFontWeight, fontWeight)}
                        filterOptions={false}
                        allowCustomValue={true}
                    />
                </div>
            </section>
        </section>
    );
};

// Функция для получения иконки выравнивания
const getAlignmentIcon = (alignment: TextHorizontalAlign | TextVerticalAlign) => {
    switch (alignment) {
        case TextHorizontalAlign.Middle:
            return alignVerticalIcon;
        case TextVerticalAlign.Justify:
            return alignHorizontalIcon;
        case TextHorizontalAlign.Left:
            return alignLeftIcon;
        case TextHorizontalAlign.Right:
            return alignRightIcon;
        case TextVerticalAlign.Start:
            return alignStartIcon;
        case TextVerticalAlign.End:
            return alignEndIcon;
        default:
            return alignLeftIcon;
    }
};
