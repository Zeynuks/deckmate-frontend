import {Header} from "./view/Header/Header.tsx";
import {ToastProvider} from './view/components/design-system/Toast/ToastContext';
import {ElementPanel} from "./view/ElementPanel/ElementPanel.tsx";

function App() {

    
    return (
        <ToastProvider>
            <Header title={"Presentation name"} description={"Workspace"}/>
            <ElementPanel
                onText={() => {}} 
                onImage={() => {}} 
                onRect={() => {}}  
                onEllipse={() => {}}  
                onTriangle={() => {}}/>
        </ToastProvider>
    )
}

export default App;
