import {Header} from "./view/Header/Header.tsx";
import {ToastProvider} from './view/components/design-system/Toast/ToastContext';
import {ElementPanel} from "./view/ElementPanel/ElementPanel.tsx";
import {PresentationWorkspace} from "./view/WorkSpace/WorkSpace.tsx";


function App() {

    
    return (
        <ToastProvider>
            <Header title={"Presentation name"} description={"Workspace"} />
            <div style={{height: "calc(100vh - 96px)", display: 'flex', flexDirection: 'row', }}>
                <ElementPanel
                    onText={() => {}}
                    onImage={() => {}}
                    onRect={() => {}}
                    onEllipse={() => {}}
                    onTriangle={() => {}}/>
                <PresentationWorkspace
                    scale={1.0}
                    backgroundColor="#D9D9D9" // Цвет фона
                />
            </div>

        </ToastProvider>
    )
}

export default App;
