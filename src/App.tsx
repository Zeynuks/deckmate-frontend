import {Header} from './features/Header/Header.tsx';
import {ToastProvider} from './view/components/ui/Toast/ToastContext';
import {ElementPanel} from './features/ElementPanel/ElementPanel.tsx';
import {PresentationWorkspace} from './features/WorkSpace/WorkSpace.tsx';
import {SlideList} from './features/SlideList/SlideList.tsx';
import {Editor} from './store/types.ts';
import React from 'react';

type AppProps = {
    editor: Editor
}

export const App: React.FC<AppProps> = ({editor}: AppProps) => {

    return (
        <ToastProvider>
                <Header title={editor.presentation.title} description={'Workspace'}/>
                <div style={{
                    height: 'calc(100vh - 96px)',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <ElementPanel
                        onText={() => {
                        }}
                        onImage={() => {
                        }}
                        onRect={() => {
                        }}
                        onEllipse={() => {
                        }}
                        onTriangle={() => {
                        }}/>
                    <PresentationWorkspace
                        presentation={editor.presentation}
                        selected={editor.selected}
                        scale={1.0}
                    />
                    <SlideList slides={editor.presentation.slides} selected={editor.selected}/>
                </div>
        </ToastProvider>
    );
};
