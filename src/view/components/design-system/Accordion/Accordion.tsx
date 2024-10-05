import React, { useState } from 'react';
import styles from './Accordion.module.css';

type AccordionItemProps = {
    title: string;
    content: React.ReactNode;
};

type AccordionProps = {
    items: AccordionItemProps[];
};

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className={styles.accordion}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <button
                        className={`${styles.title} ${openIndex === index ? styles.active : ''}`}
                        onClick={() => toggleItem(index)}
                    >
                        {item.title}
                    </button>
                    {openIndex === index && <div className={styles.content}>{item.content}</div>}
                </div>
            ))}
        </div>
    );
};
