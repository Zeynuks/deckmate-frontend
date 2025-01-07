import {createRoot} from 'react-dom/client';
import {jsPDF} from 'jspdf';
import domtoimage from 'dom-to-image';
import {Slide as SlideType} from '../store/types';
import {Slide} from '../view/Slide/Slide';
import {Provider} from 'react-redux';
import store, {RootState, useAppSelector} from '../store/store';
import {ToastProvider} from '../view/components/Toast/ToastContext.tsx';

export default function useExportToPDF() {
    const title = useAppSelector((state: RootState) => state.presentation.title);
    return async (slides: SlideType[]) => {
        const outerContainer = document.createElement('div');
        outerContainer.style.position = 'fixed';
        outerContainer.style.top = '-9999px';
        outerContainer.style.left = '-9999px';
        outerContainer.style.width = '1px';
        outerContainer.style.height = '1px';
        outerContainer.style.overflow = 'visible';
        document.body.appendChild(outerContainer);

        const innerContainer = document.createElement('div');
        innerContainer.style.position = 'relative';
        innerContainer.style.width = '1920px';
        innerContainer.style.height = '1080px';
        outerContainer.appendChild(innerContainer);

        const root = createRoot(innerContainer);

        try {
            const pdf = new jsPDF('landscape', 'px', [1920, 1080]);

            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];

                root.render(
                    <Provider store={store}>
                        <ToastProvider>
                            <svg
                                viewBox="0 0 1920 1080"
                                style={{
                                    width: '1920px',
                                    height: '1080px',
                                    margin: 0,
                                    padding: 0,
                                    overflow: 'visible',
                                }}
                            >
                                <Slide slide={slide} onView={false} />
                            </svg>
                        </ToastProvider>
                    </Provider>
                );

                await document.fonts.ready;
                await new Promise((resolve) => setTimeout(resolve, 100));
                const dataUrl = await domtoimage.toPng(innerContainer);

                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(dataUrl, 'PNG', 0, 0, 1920, 1080);
            }
            pdf.save(`${title.replace(' ', '_')}.pdf`);
        } finally {
            root.unmount();
            document.body.removeChild(outerContainer);
        }
    };
}
