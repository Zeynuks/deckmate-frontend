import styles from './TextPanel.module.css';
import {Button} from '../../view/components/ui/Button/Button.tsx';
import {Typography} from '../../view/components/ui/Typography/Typography.tsx';
import {InputDropdown} from '../../view/components/ui/InputDropdown/InputDropdown.tsx';

type TextPanelProps = {
    onBack: () => void;
    onView: () => void;
    onForward: () => void;
    disabledBack?: boolean;
    disabledView?: boolean;
    disabledForward?: boolean;
};

export const TextPanel: React.FC<TextPanelProps> = ({

                                                }) => {
    return (
        <section className={styles.history}>
          <section>
              <Typography></Typography>
              <Button></Button>
          </section>
            <section>
                <Typography></Typography>
                <div>
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                    <Button></Button>
                </div>
            </section>
            <section>
                <div>
                    <Typography></Typography>
                    <InputDropdown></InputDropdown>
                </div>
                <div>
                    <div>
                        <Typography></Typography>
                        <InputDropdown></InputDropdown>
                    </div>
                    <div>
                        <Typography></Typography>
                        <InputDropdown></InputDropdown>
                    </div>
                </div>
                <div>
                    <div>
                        <Typography></Typography>
                        <InputDropdown></InputDropdown>
                    </div>
                    <div>
                        <Typography></Typography>
                        <InputDropdown></InputDropdown>
                    </div>
                </div>
            </section>
        </section>
    );
};
