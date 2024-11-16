import React, { useState, useEffect } from 'react';
import LoadingScreen from './view/LoadingScreen/LoadingScreen';
import DeckMate from './DeсkMate.tsx';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            console.log('Страница и все ресурсы полностью загружены');
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
        <>
            {isLoading ? <LoadingScreen /> : <DeckMate/>}
        </>
    );
};

export default App;
