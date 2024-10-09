import React from 'react';
import {Slide as SlideType, ObjectType} from '../../source/types.ts';
import {TextObjectComponent} from './TextObject/TextObject.tsx';
import {ImageObjectComponent} from './ImageObject/ImageObject.tsx';
import {Transformable} from "../../view/components/shared/Transformable.tsx";

type SlideProps = {
    slide: SlideType;
    borderRadius?: number;
    onView?: boolean
};

export const Slide: React.FC<SlideProps> = ({slide, borderRadius = 0, onView = false}) => {
    const {background, objects} = slide;

    const viewObjects = objects.map((obj) => {
        switch (obj.type) {
            case ObjectType.Text:
                return <Transformable
                        onView={onView}
                        initialX={obj.position.x}
                        initialY={obj.position.y}
                        initialWidth={obj.size.width}
                        initialHeight={obj.size.height}
                        initialRotate={obj.rotation || 0}>
                        <TextObjectComponent object={obj} onView={onView} />
                    </Transformable>;
            case ObjectType.Image:
                return <Transformable
                        onView={onView}
                        initialX={obj.position.x}
                        initialY={obj.position.y}
                        initialWidth={obj.size.width}
                        initialHeight={obj.size.width}
                        initialRotate={obj.rotation || 0}>
                        <ImageObjectComponent object={obj} onView={onView} />;
                    </Transformable>;
            default:
                return null;
        }
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
