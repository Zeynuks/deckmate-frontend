import { TextObject } from '../../../source/types.ts';
import { Transformable } from '../../../view/components/shared/Transformable.tsx';


type TextObjectProps = {
    object: TextObject;
    onDragEnd?: (id: string, x: number, y: number) => void;
};

export const TextObjectComponent: React.FC<TextObjectProps> = ({
                                                                   object,
                                                                   onDragEnd,
                                                               }) => (
    <Transformable
        initialX={object.position.x}
        initialY={object.position.y}
        onDragEnd={(newX, newY) => onDragEnd && onDragEnd(object.id, newX, newY)}
    >
        <text
            x={0}
            y={0}
            fontSize={object.fontSize}
            fontFamily={object.fontFamily}
            textAnchor={object.textAlign === 'center' ? 'middle' : object.textAlign === 'right' ? 'end' : 'start'}
            fill={object.color || '#000'}
        >
            {object.content}
        </text>
    </Transformable>
);
