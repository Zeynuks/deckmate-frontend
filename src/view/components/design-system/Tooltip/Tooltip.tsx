import React, { useState } from 'react';
import styles from './Tooltip.module.css';

type TooltipProps = {
    content: React.ReactNode;
    children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <span className={styles.tooltipWrapper}>
      <span
          className={styles.target}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
            {visible && <span className={styles.tooltip}>{content}</span>}
    </span>
    );
};
