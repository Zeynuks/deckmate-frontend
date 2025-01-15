import React, {useState, useContext, useCallback} from 'react';
import {
    ObjectType,
    Slide as SlideType,
    TextObject,
    ImageObject,
} from '../../store/types.ts';
import {TextComponent} from '../components/TextObject/TextObject.tsx';
import {ImageComponent} from '../components/ImageObject/ImageObject.tsx';
import {Transformable} from '../components/Transformable/Transformable.tsx';
import {useAppActions} from '../../hooks/useAppActions.ts';
import {KeyCodes, useHotkeys} from '../../hooks/useHotkeys.ts';
import {RootState, useAppSelector} from '../../store/store.ts';
import {HistoryContext} from '../../hooks/historyContenx.ts';
import {v4 as uuidv4} from 'uuid';

type SlideProps = {
    slide: SlideType;
    onView?: boolean;
    borderRadius?: number;
};

export const Slide: React.FC<SlideProps> = ({
                                                slide,
                                                onView = false,
                                                borderRadius = 0,
                                            }) => {
    const [edit, setEdit] = useState(false);

    const [clipboard, setClipboard] = useState<(TextObject | ImageObject)[]>([]);

    const selected = useAppSelector((state: RootState) => state.selected);
    const {
        setSelected,
        removeObject,
        setText,
        addTextObject,
        addImageObject,
        setEditor,
    } = useAppActions();

    const history = useContext(HistoryContext);

    const copyObjects = useCallback(() => {
        if (!selected.objects.length) return;
        const objectsToCopy = slide.objects.filter((obj) =>
            selected.objects.includes(obj.id)
        ) as (TextObject | ImageObject)[];
        setClipboard(objectsToCopy);
    }, [selected, slide.objects]);

    const pasteObjects = useCallback(() => {
        if (!clipboard.length) return;

        const newIds: string[] = [];

        clipboard.forEach((obj) => {
            const clonedObj = {
                ...obj,
                id: uuidv4(),
                position: {
                    x: obj.position.x + 20,
                    y: obj.position.y + 20,
                },
            };

            if (clonedObj.type === ObjectType.Text) {
                addTextObject(clonedObj as TextObject);
            } else if (clonedObj.type === ObjectType.Image) {
                addImageObject(clonedObj as ImageObject);
            }
            newIds.push(clonedObj.id);
        });

        setSelected(slide.id, newIds);
    }, [clipboard, addTextObject, addImageObject, setSelected, slide.id]);

    const cutObjects = useCallback(() => {
        if (!selected.objects.length) return;
        copyObjects();
        removeObject();
    }, [copyObjects, removeObject, selected.objects.length]);

    useHotkeys(
        [KeyCodes.delete],
        (e) => {
            e.preventDefault();
            if (selected.objects.length > 0) removeObject();
        },
        {enabled: !edit}
    );

    const onUndo = () => {
        const newEditor = history.undo();
        if (newEditor) {
            setEditor(newEditor);
        }
    };
    const onRedo = () => {
        const newEditor = history.redo();
        if (newEditor) {
            setEditor(newEditor);
        }
    };

    useHotkeys(
        [KeyCodes.ctrlZ, KeyCodes.metaZ],
        (e) => {
            e.preventDefault();
            onUndo();
        },
        {enabled: !edit}
    );

    useHotkeys(
        [KeyCodes.ctrlY, KeyCodes.metaY, KeyCodes.ctrlShiftZ, KeyCodes.metaShiftZ],
        (e) => {
            e.preventDefault();
            onRedo();
        },
        {enabled: !edit}
    );

    useHotkeys(
        [KeyCodes.ctrlC, KeyCodes.metaC],
        (e) => {
            e.preventDefault();
            copyObjects();
        },
        {enabled: !edit}
    );

    useHotkeys(
        [KeyCodes.ctrlV, KeyCodes.metaV],
        (e) => {
            e.preventDefault();
            pasteObjects();
        },
        {enabled: !edit}
    );

    useHotkeys(
        [KeyCodes.ctrlX, KeyCodes.metaX],
        (e) => {
            e.preventDefault();
            cutObjects();
        },
        {enabled: !edit}
    );
    console.log(edit)
    const objects = slide.objects.map((object) => {
        const renderSlideObject = (
            size: { width: number; height: number },
            isEditing: boolean
        ) => {
            if (object.id === selected.objects[0]) {
                setEdit(isEditing);
            }
            switch (object.type) {
                case ObjectType.Text:
                    return (
                        <TextComponent
                            key={object.id}
                            object={object}
                            size={size}
                            isEditing={isEditing}
                            onFinishEdit={(updatedObject: TextObject) => {
                                setText(updatedObject);
                            }}
                        />
                    );
                case ObjectType.Image:
                    return (
                        <ImageComponent
                            key={object.id}
                            object={object}
                            size={size}
                            isEditing={isEditing}
                        />
                    );
                default:
                    return null;
            }
        };

        return (
            <Transformable
                key={object.id}
                isHidden={
                    selected.objects &&
                    selected.objects.includes(object.id) &&
                    onView
                }
                position={{x: object.position.x, y: object.position.y}}
                size={{height: object.size.height, width: object.size.width}}
                angle={object.angle || 0}
                onClick={() => {
                    if (onView) {
                        setSelected(slide.id, [object.id]);
                    }
                }}
            >
                {(size: { width: number; height: number }, isEditing: boolean) =>
                    renderSlideObject(size, isEditing)
                }
            </Transformable>
        );
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
                        fill="transparent"
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

            {objects.length !== 0 ? objects : null}
        </>
    );
};
