import React from 'react';
import { Slide as SlideType } from '../../store/types.ts';
import { TextObjectComponent } from './TextObject/TextObject.tsx';
import { ImageObjectComponent } from './ImageObject/ImageObject.tsx';
import { Transformable } from '../components/shared/Transformable.tsx';
import { dispatch } from '../../store/editor.ts';
import { setSelected } from '../../store/functions/setSelected.ts';
import { removeObject } from '../../store/functions/removeObject.ts';
import { setObjectPos } from "../../store/functions/setObjectPos.ts";
import { setObjectSize } from "../../store/functions/setObjectSize.ts";
import { setObjectAngle } from "../../store/functions/setObjectAngle.ts";

type SlideProps = {
    slide: SlideType;
    selectedObjects: object[];
    onView?: boolean;
};

export const Slide: React.FC<SlideProps> = ({ slide, selectedObjects, onView = false }) => {
    const { background, objects } = slide;

    const viewObjects = objects.map((obj) => {
        const isSelected = selectedObjects && selectedObjects.includes(obj.id);

        if (obj.position.x + obj.size.width < 0 || obj.position.y + obj.size.height < 0) {
            dispatch(removeObject, { objectId: obj.id });
            return null;
        }

        const object = () => {
            switch (obj.type) {
                case 'text':
                    return <TextObjectComponent width={obj.size.width} height={obj.size.height} slideObject={obj} onView={onView} />;
                case 'image':
                    return <ImageObjectComponent width={obj.size.width} height={obj.size.height} slideObject={obj} onView={onView} />;
                default:
                    return null;
            }
        };

        return (
            <Transformable
                key={obj.id}
                hidden={isSelected && onView}
                position={{ x: obj.position.x, y: obj.position.y }}
                size={{ height: obj.size.height, width: obj.size.width }}
                angle={obj.angle || 0}
                onResize={(newWidth, newHeight) => {
                    dispatch(setObjectSize, { width: newWidth, height: newHeight });
                }}
                onDrag={(newX, newY) => {
                    dispatch(setObjectPos, { x: newX, y: newY });
                }}
                onRotate={(angle) => {
                    dispatch(setObjectAngle, angle);
                }}
                onClick={() => {
                    dispatch(setSelected, {
                        slideId: slide.id,
                        objectId: [obj.id],
                    });
                }}
                onView={onView}
            >
                {object()}
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
            {viewObjects}
        </g>
    );
};
