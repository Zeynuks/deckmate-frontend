import React, { useState, useEffect } from 'react';
import styles from './SlideViewer.module.css';
import { RootState, useAppSelector } from '../../store/store.ts';
import { Slide } from '../Slide/Slide.tsx';
import { ToastProvider } from '../components/Toast/ToastContext.tsx';
import { useHotkeys, KeyCodes } from '../../hooks/useHotkeys';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button/Button.tsx';
import { Typography } from '../components/Typography/Typography.tsx';

import undoIcon from '../../assets/icons/left_arrow.svg';
import redoIcon from '../../assets/icons/right_arrow.svg';
import resize from '../../assets/icons/resize.svg';
import settings from '../../assets/icons/settings.svg';
import menu from '../../assets/icons/menu-light.svg';

const SlideViewer: React.FC = () => {
    const navigate = useNavigate();
    const slides = useAppSelector((state: RootState) => state.presentation.slides);
    const title = useAppSelector((state: RootState) => state.presentation.title);

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showHeader, setShowHeader] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const closeView = () => {
        navigate('/');
    };

    const goToNextSlide = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const goToPreviousSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        const { clientY } = event;
        const topThreshold = 75;
        const bottomThreshold = window.innerHeight - topThreshold;

        if (clientY < topThreshold || clientY > bottomThreshold) {
            setShowHeader(true);
            setShowButtons(true);
        } else {
            setShowHeader(false);
            setShowButtons(false);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useHotkeys([KeyCodes.escape], closeView, { enabled: true });
    useHotkeys([KeyCodes.arrowLeft], goToPreviousSlide, { enabled: true });
    useHotkeys([KeyCodes.arrowRight], goToNextSlide, { enabled: true });
    useHotkeys([KeyCodes.arrowUp], goToPreviousSlide, { enabled: true });
    useHotkeys([KeyCodes.arrowDown], goToNextSlide, { enabled: true });

    return (
        <ToastProvider>
            <div
                className={styles.header}
                style={{
                    opacity: showHeader ? 1 : 0,
                    transition: 'opacity 0.7s',
                }}
            >
                <div className={styles.headerInnerLeft}>
                    <Button className={styles.menuButton} iconSize={36} iconSrc={menu}></Button>
                </div>
              <div className={styles.title}>
                  <Typography variant={'description'} color={'#FFFFFF'}>{title}</Typography>
              </div>
                <div className={styles.headerInnerRight}>
                    <div className={styles.headerButtons}>
                        <Button className={styles.shareButton}>Share view</Button>
                        <Button className={styles.settingsButton} iconSize={28} iconSrc={settings}></Button>
                        <Button className={styles.resizeButton} iconSize={24} iconSrc={resize}></Button>
                    </div>
                </div>
            </div>
            <div
                className={styles.buttons}
                style={{
                    opacity: showButtons ? 1 : 0,
                    transition: 'opacity 0.7s',
                }}
            >
                <img className={styles.button} src={undoIcon} onClick={goToPreviousSlide}></img>
                <span>{currentSlideIndex + 1}/{slides.length}</span>
                <img className={styles.button} src={redoIcon} onClick={goToNextSlide}></img>
            </div>
            <div className={styles.viewContainer}>
                <svg viewBox={'0 0 1920 1080'}>
                    <Slide slide={slides[currentSlideIndex]} onView={false} />
                </svg>
            </div>
        </ToastProvider>
    );
};

export default SlideViewer;
