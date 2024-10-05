import React from 'react';
import styles from './Breadcrumb.module.css';

type BreadcrumbItemProps = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItemProps[];
    separator?: string;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className={styles.breadcrumb}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {item.href ? (
                            <a href={item.href} className={styles.link}>
                                {item.label}
                            </a>
                        ) : (
                            <span className={styles.label}>{item.label}</span>
                        )}
                        {index < items.length - 1 && <span className={styles.separator}>{separator}</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
