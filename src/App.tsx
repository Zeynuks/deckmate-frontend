import {Header} from "./view/Header/Header.tsx";
import {ToastProvider} from './view/components/design-system/Toast/ToastContext';
import {ElementPanel} from "./view/ElementPanel/ElementPanel.tsx";
import {PresentationWorkspace} from "./view/WorkSpace/WorkSpace.tsx";
import {ObjectID, ObjectType, Presentation, Selected, SlideID} from "./source/types.ts";
import {v4 as uuidv4} from 'uuid';
import {SlideList} from "./view/SlideList/SlideList.tsx";
import image from './assets/6581494373.jpg'

function App() {
    const presentation: Presentation = {
        title: 'Full Presentation',
        slides: [
            {
                id: uuidv4() as SlideID,
                background: {
                    type: 'color',
                    color: '#FFFFFF'
                },
                objects: [
                    {
                        id: uuidv4() as ObjectID,
                        size: {
                            width: 500,
                            height: 200
                        },
                        position: {
                            x: 200,
                            y: 400
                        },
                        type: ObjectType.Text,
                        content: 'This is a full text object',
                        fontSize: 72,
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: 300,
                        color: 'hsl(120, 100%, 50%)'
                    },
                    {
                        id: uuidv4() as ObjectID,
                        size: {
                            width: 300,
                            height: 200
                        },
                        position: {
                            x: 100,
                            y: 200
                        },
                        type: ObjectType.Image,
                        src: image,
                        altText: 'Sample image'
                    }
                ]
            },
            {
                id: uuidv4() as SlideID,
                background: {
                    type: "color",
                    color: '#FFFFFF',
                },
                objects: []
            },
            {
                id: uuidv4() as SlideID,
                background: {
                    type: "color",
                    color: '#D9D9D9',
                },
                objects: []
            },
            {
                id: uuidv4() as SlideID,
                background: {
                    type: "color",
                    color: '#D9D9D9',
                },
                objects: []
            },
            {
                id: uuidv4() as SlideID,
                background: {
                    type: "color",
                    color: '#D9D9D9',
                },
                objects: []
            },
            {
                id: uuidv4() as SlideID,
                background: {
                    type: "color",
                    color: '#D9D9D9',
                },
                objects: []
            },
            {
                id: uuidv4() as SlideID,
                background: {
                    type: "image",
                    src: image,
                },
                objects: []
            }
        ]
    };

    const selected: Selected = {
        slideId: presentation.slides[0].id as SlideID,
        objectId: [presentation.slides[0].objects[0].id, presentation.slides[0].objects[1].id] as ObjectID[]
    };

    return (
        <ToastProvider>
            <Header title={presentation.title} description={"Workspace"}/>
            <div style={{height: "calc(100vh - 96px)", display: 'flex', flexDirection: 'row',}}>
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
                    presentation={presentation}
                    selected={selected}
                    scale={1.0}
                />
                <SlideList presentation={presentation} selected={selected}/>
            </div>

        </ToastProvider>
    )
}

export default App;
