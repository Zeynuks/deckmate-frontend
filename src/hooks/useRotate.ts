// useRotate.ts
import { useRef, useEffect } from 'react';
import { useMousePosition } from './useMousePosition';

type UseRotateProps = {
    position: { x: number; y: number };
    angle: number;
    onRotate: (angle: number) => void;
    onView: boolean;
    transformableRef: React.RefObject<SVGGElement>;
};

export const useRotate = ({
                              position,
                              angle,
                              onRotate,
                              onView,
                              transformableRef,
                          }: UseRotateProps) => {
    const isRotating = useRef(false);
    const startMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const startAngle = useRef(angle);
    const center = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const { getMousePosition } = useMousePosition(transformableRef);

    const handleRotateMouseDown = (e: React.MouseEvent) => {
        if (!onView) return;
        e.preventDefault();
        e.stopPropagation();
        isRotating.current = true;
        startMousePosition.current = getMousePosition(e.nativeEvent);
        startAngle.current = angle;

        center.current = {
            x: position.x,
            y: position.y,
        };

        window.addEventListener('mousemove', handleRotateMouseMove);
        window.addEventListener('mouseup', handleRotateMouseUp);
    };

    const handleRotateMouseMove = (e: MouseEvent) => {
        if (!isRotating.current) return;

        const mousePosition = getMousePosition(e);
        const dx = mousePosition.x - center.current.x;
        const dy = mousePosition.y - center.current.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const startDx = startMousePosition.current.x - center.current.x;
        const startDy = startMousePosition.current.y - center.current.y;
        const startAngleRad = Math.atan2(startDy, startDx) * (180 / Math.PI);
        const deltaAngle = angle - startAngleRad;

        onRotate(startAngle.current + deltaAngle);
    };

    const handleRotateMouseUp = () => {
        isRotating.current = false;
        window.removeEventListener('mousemove', handleRotateMouseMove);
        window.removeEventListener('mouseup', handleRotateMouseUp);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleRotateMouseMove);
            window.removeEventListener('mouseup', handleRotateMouseUp);
        };
    }, []);

    return { handleRotateMouseDown };
};
