import React, { useState, useEffect } from 'react';
import LoadingScreen from './view/LoadingScreen/LoadingScreen';
import DeckMate from './DeсkMate.tsx';
import {HistoryType} from './utils/history.ts';

type AppProps = {
    history: HistoryType,
}

const App: React.FC<AppProps> = ({history}) => {
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
            {isLoading ? <LoadingScreen /> : <DeckMate history={history} />}
        </>
    );
};

export default App;
