import { useEffect, useState, RefObject } from 'react';

export const useDimensions = (ref: RefObject<HTMLElement>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (ref.current) {
                setDimensions({
                    width: ref.current.clientWidth,
                    height: ref.current.clientHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [ref]);

    return dimensions;
};