import {Header} from './view/Header/Header.tsx';
import {ToastProvider} from './view/components/ui/Toast/ToastContext';
import {ElementPanel} from './view/ElementPanel/ElementPanel.tsx';
import {PresentationWorkspace} from './view/WorkSpace/WorkSpace.tsx';
import {SlideList} from './view/SlideList/SlideList.tsx';
import {Editor} from './store/types.ts';
import React from 'react';

type AppProps = {
    editor: Editor
}

export const App: React.FC<AppProps> = ({editor}: AppProps) => {
    const e = {...editor};
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
                    {/*<TextPanel textObject={editor.presentation.slides[0].objects[0]}/>*/}
                    <PresentationWorkspace
                        presentation={editor.presentation}
                        selected={editor.selected}
                        scale={1.0}
                    />
                    <SlideList slides={e.presentation.slides} selected={editor.selected}/>
                </div>
        </ToastProvider>
    );
};
