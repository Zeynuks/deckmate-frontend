import { Header } from './view/Header/Header';
import { ToastProvider } from './view/components/ui/Toast/ToastContext';
import { ElementPanel } from './view/ElementPanel/ElementPanel';
import { PresentationWorkspace } from './view/WorkSpace/WorkSpace';
import { SlideList } from './view/SlideList/SlideList';
import React from 'react';

export const App: React.FC = () => {

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
