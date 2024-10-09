import { ImageObject } from '../../../source/types.ts';
import { Transformable } from '../../../view/components/shared/Transformable.tsx';

type ImageObjectProps = {
    object: ImageObject;
    onDragEnd?: (id: string, x: number, y: number) => void;
};

export const ImageObjectComponent: React.FC<ImageObjectProps> = ({
                                                                     object,
                                                                     onDragEnd,
                                                                 }) => (
    <Transformable
        initialX={object.position.x}
        initialY={object.position.y}
        onDragEnd={(newX, newY) => onDragEnd && onDragEnd(object.id, newX, newY)}
    >
        <image href={object.src} x={0} y={0} width={object.size.width} height={object.size.height} />
    </Transformable>
);
