import React, { useEffect, useRef, useState } from 'react';
import styles from './WorkSpace.module.css';
type WorkspaceProps = {
    scale?: number;
    backgroundColor?: string;
};

export const PresentationWorkspace: React.FC<WorkspaceProps> = ({
                                                                    scale = 1.0,
                                                                    backgroundColor = '#D9D9D9',
                                                                }) => {
    const workspaceRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (workspaceRef.current) {
                setDimensions({
                    width: workspaceRef.current.clientWidth,
                    height: workspaceRef.current.clientHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div className={styles.workspaceContainer}>
            <div
                ref={workspaceRef}
                className={styles.workspace}
                style={{
                    backgroundColor,
                    transform: `scale(${scale})`,
                }}
            >
                {/* SVG или другой контент рабочей зоны */}
                <svg
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{ display: 'block', backgroundColor: backgroundColor }}
                >
                    {/* Место для объектов слайда */}
                </svg>
            </div>
        </div>
    );
};
