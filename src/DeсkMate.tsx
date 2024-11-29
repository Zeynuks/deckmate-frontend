import {ToastProvider} from './view/components/Toast/ToastContext.tsx';
import {Header} from './view/Header/Header.tsx';
import {ElementPanel} from './view/ElementPanel/ElementPanel.tsx';
import {PresentationWorkspace} from './view/WorkSpace/WorkSpace.tsx';
import {SlideList} from './view/SlideList/SlideList.tsx';
import React from 'react';
import { HistoryContext } from './hooks/historyContenx.ts';
import {HistoryType} from './utils/history.ts';

type DeckMateProps = {
    history: HistoryType,
}

const DeckMate: React.FC<DeckMateProps> = ({history}) => {
    return (
        <HistoryContext.Provider value={history}>
            <ToastProvider>
                <Header description={'Workspace'}/>
                <div style={{
                    height: 'calc(100vh - 96px)',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <ElementPanel/>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <PresentationWorkspace/>
                    </div>
                    <SlideList/>
                </div>
            </ToastProvider>
        </HistoryContext.Provider>
    );
};

export default DeckMate;
