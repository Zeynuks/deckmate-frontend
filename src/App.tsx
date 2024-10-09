import {Header} from './features/Header/Header.tsx';
import {ToastProvider} from './view/components/ui/Toast/ToastContext';
import {ElementPanel} from './features/ElementPanel/ElementPanel.tsx';
import {PresentationWorkspace} from './features/WorkSpace/WorkSpace.tsx';
import {ObjectID, ObjectType, Presentation, Selected, SlideID} from './source/types.ts';
import {v4 as uuidv4} from 'uuid';
import {SlideList} from './features/SlideList/SlideList.tsx';
import image from './assets/6581494373.jpg';

function App() {
    const presentation: Presentation = {
        title: 'Full Presentation',
        slides: [
            {
                id: uuidv4() as SlideID,
                size: {
                    width: 1920,
                    height: 1080
                },
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
                            x: 1000,
                            y: 20
                        },
                        rotation: 0,
                        type: ObjectType.Text,
                        content: 'This is a full text object',
                        fontSize: 72,
                        fontFamily: 'Nunito',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: 20,
                        color: 'hsl(120, 100%, 50%)'
                    },
                    {
                        id: uuidv4() as ObjectID,
                        size: {
                            width: 192,
                            height: 108
                        },
                        position: {
                            x: 200,
                            y: 300
                        },
                        rotation: 0,
                        type: ObjectType.Image,
                        src: image,
                        altText: 'Sample image'
                    }
                ]
            },
            {
                id: uuidv4() as SlideID,
                size: {
                    width: 1920,
                    height: 1080
                },
                background: {
                    type: 'color',
                    color: '#FFFFFF',
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
            <Header title={presentation.title} description={'Workspace'}/>
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
                    presentation={presentation}
                    selected={selected}
                    scale={1.0}
                />
                <SlideList presentation={presentation} selected={selected} onAddSlide={() => {}}/>
            </div>

        </ToastProvider>
    );
}

export default App;
