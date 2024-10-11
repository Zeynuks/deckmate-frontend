import React, { useState } from 'react';
import { Slide as SlideType } from '../../store/types.ts';
import { TextObjectComponent } from './TextObject/TextObject.tsx';
import { ImageObjectComponent } from './ImageObject/ImageObject.tsx';
import { Transformable } from '../../view/components/shared/Transformable.tsx';
import {dispatch} from '../../store/editor.ts';
import {setSelected} from '../../store/functions/setSelected.ts';
import {removeObject} from '../../store/functions/removeObject.ts';

type SlideProps = {
    slide: SlideType;
    selectedObjects: object[];
    borderRadius?: number; //Убрать
    onView?: boolean;
};

export const Slide: React.FC<SlideProps> = ({ slide, selectedObjects, borderRadius = 0, onView = false }) => {
    const { background, objects } = slide;

    const viewObjects = objects.map((obj) => {
        const [width, setWidth] = useState(obj.size.width);
        const [height, setHeight] = useState(obj.size.height);
        const [x, setX] = useState(obj.position.x);
        const [y, setY] = useState(obj.position.y);
        const [rotation, setRotation] = useState(obj.rotation || 0);
        const isSelected = selectedObjects && selectedObjects.includes(obj.id);

        if (obj.position.x + obj.size.width < 0 || obj.position.y + obj.size.height < 0) {
            dispatch(removeObject);
            return <></>;
        }

        const object = () => {
            switch (obj.type) {
                case 'text':
                    return <TextObjectComponent width={width} height={height} slideObject={obj} onView={onView} />;
                case 'image':
                    return <ImageObjectComponent width={width} height={height} slideObject={obj} onView={onView} />;
                default:
                    return null;
            }
        };

            return (
                <Transformable
                    key={obj.id}
                    hidden={isSelected && onView}
                    position={{x, y}}
                    size={{height, width}}
                    rotation={rotation}
                    onResize={(newWidth, newHeight) => {
                        setWidth(newWidth);
                        setHeight(newHeight);
                    }}
                    onDrag={(newX, newY) => {
                        setX(newX);
                        setY(newY);
                    }}
                    onRotate={(newRotation) => {
                        setRotation(newRotation);
                    }}
                    onClick={() => {dispatch(setSelected, {
                        slideId: slide.id,
                        objectId: [obj.id],
                    });}}
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
                    rx={borderRadius}
                    ry={borderRadius}
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
