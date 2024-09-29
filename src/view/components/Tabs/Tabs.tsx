import React, { useState } from 'react';
import styles from './Tabs.module.css';

type TabItem = {
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    items: TabItem[];
    initialActiveIndex?: number;
};

export const Tabs: React.FC<TabsProps> = ({
                                              items,
                                              initialActiveIndex = 0,
                                          }) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    return (
        <div className={styles.tabs}>
            <div className={styles.tabList}>
                {items.map((item, index) => (
                    <button
                        key={index}
                        className={`${styles.tab} ${
                            activeIndex === index ? styles.active : ''
                        }`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className={styles.tabContent}>{items[activeIndex].content}</div>
        </div>
    );
};
