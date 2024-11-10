import { Header } from './view/Header/Header';
import { ToastProvider } from './view/components/ui/Toast/ToastContext';
import { ElementPanel } from './view/ElementPanel/ElementPanel';
import { PresentationWorkspace } from './view/WorkSpace/WorkSpace';
import { SlideList } from './view/SlideList/SlideList';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import React from 'react';

export const App: React.FC = () => {
    const editor = useSelector((state: RootState) => state);

    return (
        <ToastProvider>
            <Header title={editor.presentation.title} description={'Workspace'} />
            <div style={{
                height: 'calc(100vh - 96px)',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <ElementPanel />
                <PresentationWorkspace
                    presentation={editor.presentation}
                    selected={editor.selected}
                    scale={1.0}
                />
                <SlideList slides={editor.presentation.slides} selected={editor.selected} />
            </div>
        </ToastProvider>
    );
};
