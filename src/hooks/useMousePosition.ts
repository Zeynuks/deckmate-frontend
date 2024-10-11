type MousePosition = { x: number; y: number };

export const useMousePosition = (transformableRef: React.RefObject<SVGGElement>) => {
    const getMousePosition = (e: MouseEvent | React.MouseEvent): MousePosition => {
        const svg = transformableRef.current?.ownerSVGElement;
        if (!svg) return { x: e.clientX, y: e.clientY };
        const point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const ctm = svg.getScreenCTM()?.inverse();
        if (ctm) {
            const svgPoint = point.matrixTransform(ctm);
            return { x: svgPoint.x, y: svgPoint.y };
        }
        return { x: e.clientX, y: e.clientY };
    };

    return { getMousePosition };
};
