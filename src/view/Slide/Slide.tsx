import {ObjectType, Slide as SlideType, TextObject} from '../../store/types.ts';
import {TextComponent} from '../components/TextObject/TextObject.tsx';
import {ImageComponent} from '../components/ImageObject/ImageObject.tsx';
import {Transformable} from '../components/Transformable/Transformable.tsx';
import {useAppActions} from '../../hooks/useAppActions.ts';
import {KeyCodes, useHotkeys} from '../../hooks/useHotkeys.ts';
import {RootState, useAppSelector} from '../../store/store.ts';

type SlideProps = {
    slide: SlideType;
    onView?: boolean;
    borderRadius?: number;
};

export const Slide: React.FC<SlideProps> = ({
                                                slide,
                                                onView = false,
                                                borderRadius = 0
                                            }) => {
    const selected = useAppSelector((state: RootState) => state.selected);
    const {setSelected, removeObject, setText} = useAppActions();
    const objects = slide.objects.map((object) => {
        const slideObject = (size: { width: number, height: number }, isEditing: boolean) => {
            switch (object.type) {
                case  ObjectType.Text:
                    return <TextComponent key={object.id} object={object} size={size} isEditing={isEditing} onFinishEdit={(updatedObject: TextObject) => {
                        setText(updatedObject);
                    }}/>;
                case ObjectType.Image:
                    return <ImageComponent key={object.id} object={object} size={size} isEditing={isEditing}/>;
                default:
                    return <></>;
            }
        };

        return (
            <Transformable
                key={object.id}
                isHidden={selected.objects && selected.objects.includes(object.id) && onView}
                position={{x: object.position.x, y: object.position.y}}
                size={{height: object.size.height, width: object.size.width}}
                angle={object.angle || 0}
                onClick={() => {
                    if (onView) {
                        setSelected(slide.id, [object.id]);
                    }
                }}
            >
                {(size: { width: number, height: number }, isEditing: boolean) => slideObject(size, isEditing)}
            </Transformable>
        );
    });

    useHotkeys([KeyCodes.delete], event => {
        event.preventDefault();
        if (selected.objects.length > 0) removeObject();
    });

    return (
        <>
            <defs>
                <clipPath id={`slide-${slide.id}`}>
                    <rect
                        x={0}
                        y={0}
                        width={slide.size.width}
                        height={slide.size.height}
                        fill='transparent'
                        rx={borderRadius}
                        ry={borderRadius}
                    />
                </clipPath>
            </defs>
            {slide.background.type === 'color' && (
                <g clipPath={`url(#slide-${slide.id})`}>
                    <rect
                        x={0}
                        y={0}
                        width={slide.size.width}
                        height={slide.size.height}
                        fill={slide.background.color}
                        onClick={() => setSelected(slide.id)}
                    />
                </g>
            )}
            {slide.background.type === 'image' && (
                <g clipPath={`url(#slide-${slide.id})`}>
                    <image
                        href={slide.background.src}
                        x={0}
                        y={0}
                        width={1920}
                        height={1080}
                        preserveAspectRatio="xMidYMid slice"
                    />
                </g>
            )}
            {objects.length !== 0 ? objects : <></>}
        </>
    );
};
