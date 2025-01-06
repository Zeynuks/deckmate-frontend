import { useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Slide } from '../view/Slide/Slide';

const useExportSlidesToPDF = () => {
    const slides = useSelector((state: RootState) => state.presentation.slides);

    const exportToPDF = useCallback(async () => {
        if (!slides || slides.length === 0) {
            console.error('Нет слайдов для экспорта.');
            return;
        }

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [1920, 1080],
        });

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            const container = document.createElement('div');
            container.style.width = '1920px';
            container.style.height = '1080px';
            container.style.position = 'absolute';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '-1';
            document.body.appendChild(container);

            ReactDOM.render(<Slide slide={slide} onView={false} />, container);

            await new Promise((resolve) => setTimeout(resolve, 500));

            try {
                const canvas = await html2canvas(container, {
                    scale: 2,
                    useCORS: true,
                });
                const imgData = canvas.toDataURL('image/png');

                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
            } catch (error) {
                console.error(`Ошибка при захвате слайда ${i + 1}:`, error);
            } finally {
                ReactDOM.unmountComponentAtNode(container);
                document.body.removeChild(container);
            }
        }

        pdf.save('presentation.pdf');
    }, [slides]);

    return exportToPDF;
};

export default useExportSlidesToPDF;
