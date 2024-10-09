import React, {useState} from 'react';
import {Slide as SlideType, ObjectType} from '../../source/types.ts';
import {TextObjectComponent} from './TextObject/TextObject.tsx';
import {ImageObjectComponent} from './ImageObject/ImageObject.tsx';
import {Transformable} from "../../view/components/shared/Transformable.tsx";
import {Resizable} from "../../view/components/shared/Resizable.tsx";

type SlideProps = {
    slide: SlideType;
    borderRadius?: number;
    onView?: boolean;
};

export const Slide: React.FC<SlideProps> = ({slide, borderRadius = 0, onView = false}) => {
    const {background, objects} = slide;
    const viewObjects = objects.map((obj) => {
        const [width, setWidth] = useState(obj.size.width);
        const [height, setHeight] = useState(obj.size.height);
        return (
            <Transformable
                key={obj.id}
                onView={onView}
                initialX={obj.position.x}
                initialY={obj.position.y}
            >
                <Resizable
                    width={width}
                    height={height}
                    onResize={(newWidth, newHeight) => {
                        setWidth(newWidth);
                        setHeight(newHeight);
                    }}
                    onView={onView}
                >
                    {obj.type === ObjectType.Text ? <TextObjectComponent height={slide.size.height} width={slide.size.width} slideObject={obj} onView={onView}/> :
                        <ImageObjectComponent slideObject={obj} onView={onView}/>}
                </Resizable>
            </Transformable>
        );
    });

    return (
        <g>
            {background.type === 'color' && (
                <rect
                    x={0}
                    y={0}
                    width={1920}
                    height={1080}
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
