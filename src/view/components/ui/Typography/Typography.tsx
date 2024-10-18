import React from 'react';
import styles from './Typography.module.css';

type TypographyVariant =
    | 'description'
    | 'buttonText'
    | 'menuTitle'
    | 'menuSectionTitle'
    | 'inputText'
    | 'toastTitle'
    | 'toastDescription';

type TypographyProps = {
    variant: TypographyVariant;
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    color?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
    href?: string;
    style?: React.CSSProperties;
};

export const Typography: React.FC<TypographyProps> = ({
                                                          variant,
                                                          children,
                                                          className,
                                                          as,
                                                          color,
                                                          align,
                                                          href,
                                                          style,
                                                      }) => {
    const defaultTags: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
        description: 'p',
        buttonText: 'span',
        menuTitle: 'h2',
        menuSectionTitle: 'h3',
        inputText: 'label',
        toastTitle: 'span',
        toastDescription: 'span',
    };

    const Tag = as || defaultTags[variant] || 'p';

    const combinedStyle: React.CSSProperties = {...style};
    if (color) combinedStyle.color = color;
    if (align) combinedStyle.textAlign = align;

    const isLink = href && (Tag === 'a' || Tag === 'span');

    const combinedClassName = `${styles[variant]} ${className || ''}`.trim();

    return (
        <Tag
            className={combinedClassName}
            style={combinedStyle}
            {...(isLink ? {href} : {})}
            role={variant === 'buttonText' ? 'button' : undefined}
        >
            {children}
        </Tag>
    );
};
