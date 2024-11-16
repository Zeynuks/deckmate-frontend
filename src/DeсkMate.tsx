import {ToastProvider} from './view/components/ui/Toast/ToastContext.tsx';
import {Header} from './view/Header/Header.tsx';
import {ElementPanel} from './view/ElementPanel/ElementPanel.tsx';
import {PresentationWorkspace} from './view/WorkSpace/WorkSpace.tsx';
import {SlideList} from './view/SlideList/SlideList.tsx';
import React from 'react';

const DeckMate: React.FC = () => {
    return (
        <ToastProvider>
            <Header description={'Workspace'} />
            <div style={{
                height: 'calc(100vh - 96px)',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <ElementPanel />
                <PresentationWorkspace/>
                <SlideList/>
            </div>
        </ToastProvider>
    );
};

export default DeckMate;
