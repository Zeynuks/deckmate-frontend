import {ObjectType, Slide as SlideType} from '../../store/types.ts';
import {TextComponent} from './TextObject/TextObject.tsx';
import {ImageComponent} from './ImageObject/ImageObject.tsx';
import {Transformable} from '../components/ux/Transformable.tsx';
import {dispatch} from '../../store/editor.ts';
import {setSelected} from '../../store/functions/setSelected.ts';
import {ShapeComponent} from './ShapeObject/ShapeObject.tsx';

type SlideProps = {
    slide: SlideType;
    selectedObjectsId: object[];
    borderRadius?: number;
    onView?: boolean;
};

//TODO: Переработать Transformable

export const Slide: React.FC<SlideProps> = ({
                                                slide,
                                                selectedObjectsId,
                                                borderRadius,
                                                onView = false
                                            }) => {
    const {background, objects} = slide;
    const viewObjects = objects.map((obj) => {
        const isSelected = selectedObjectsId && selectedObjectsId.includes(obj.id);
        const object = (data: { width: number, height: number }) => {
            switch (obj.type) {
                case  ObjectType.Text:
                    return <TextComponent object={obj} data={data}/>;
                case ObjectType.Image:
                    return <ImageComponent object={obj} data={data}/>;
                case ObjectType.Shape:
                    return <ShapeComponent object={obj} data={data}/>;
                default:
                    return <></>;
            }
        };

        return (
            <Transformable
                key={obj.id}
                isHidden={isSelected && onView}
                position={{x: obj.position.x, y: obj.position.y}}
                size={{height: obj.size.height, width: obj.size.width}}
                angle={obj.angle || 0}
                onClick={() => {
                    if (onView) {
                        dispatch(setSelected, {
                            slideId: slide.id,
                            objectId: [obj.id],
                        });
                    }
                }}
            >
                {(data: { width: number, height: number }) => object(data)}
            </Transformable>
        );
    });

    return (
        <g>
            {background.type === 'color' && (
                <rect
                    x={0}
                    y={0}
                    width={slide.size.width}
                    height={slide.size.height}
                    fill={background.color}
                    rx={borderRadius}
                    ry={borderRadius}
                    onClick={() => {
                        dispatch(setSelected, {
                            slideId: slide.id,
                            objectId: [],
                        });
                    }}
                />
            )}
            {background.type === 'image' && (
                <image
                    href={background.src}
                    x={0}
                    y={0}
                    width={1920}
                    height={1080}
                    preserveAspectRatio="xMidYMid slice"
                />
            )}
            {viewObjects.length !== 0 ? viewObjects : <></>}
        </g>
    );
};
