import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoadingScreen from './view/LoadingScreen/LoadingScreen';
import DeckMate from './DeсkMate.tsx';
import {HistoryType} from './utils/history.ts';
import SlideViewer from './view/SlideViewer/SlideViewer.tsx';

type AppProps = {
    history: HistoryType;
};

const App: React.FC<AppProps> = ({ history }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/deckmate-frontend/"
                    element={isLoading ? <LoadingScreen /> : <DeckMate history={history} />}
                />
                <Route
                    path="/deckmate-frontend/present"
                    element={isLoading ? <LoadingScreen /> : <SlideViewer/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
