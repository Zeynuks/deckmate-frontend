import {ObjectType, Slide as SlideType} from '../../store/types.ts';
import {TextComponent} from '../components/ux/TextObject/TextObject.tsx';
import {ImageComponent} from '../components/ux/ImageObject/ImageObject.tsx';
import {Transformable} from '../components/ux/Transformable/Transformable.tsx';
import {useAppActions} from '../../hooks/useAppActions.ts';

type SlideProps = {
    slide: SlideType;
    selectedObjectsId: string[];
    onView?: boolean;
};

export const Slide: React.FC<SlideProps> = ({
                                                slide,
                                                selectedObjectsId,
                                                onView = false
                                            }) => {
    const {setSelected} = useAppActions();
    const objects = slide.objects.map((object) => {
        const slideObject = (data: { width: number, height: number }) => {
            switch (object.type) {
                case  ObjectType.Text:
                    return <TextComponent object={object} data={data}/>;
                case ObjectType.Image:
                    return <ImageComponent object={object} data={data}/>;
                default:
                    return <></>;
            }
        };

        return (
            <Transformable
                key={object.id}
                isHidden={selectedObjectsId && selectedObjectsId.includes(object.id) && onView}
                position={{x: object.position.x, y: object.position.y}}
                size={{height: object.size.height, width: object.size.width}}
                angle={object.angle || 0}
                onClick={() => {
                    if (onView) {
                        setSelected(slide.id, [object.id]);
                    }
                }}
            >
                {(data: { width: number, height: number }) => slideObject(data)}
            </Transformable>
        );
    });

    return (
        <g>
            {slide.background.type === 'color' && (
                <rect
                    x={0}
                    y={0}
                    width={slide.size.width}
                    height={slide.size.height}
                    fill={slide.background.color}
                    rx={20}
                    ry={20}
                    onClick={() => setSelected(slide.id)
                    }
                />
            )}
            {slide.background.type === 'image' && (
                <image
                    href={slide.background.src}
                    x={0}
                    y={0}
                    width={1920}
                    height={1080}
                    preserveAspectRatio="xMidYMid slice"
                />
            )}
            {objects.length !== 0 ? objects : <></>}
        </g>
    );
};
