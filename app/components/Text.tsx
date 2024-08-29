import React, { FC, CSSProperties } from "react";

export type TextProps = {
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "xxl"
        | "xxxl"
        | "huge"
        | "xhuge"
        | "xxhuge";
    lineBreak?: boolean;
    style?: CSSProperties;
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const sizes = {
    xs: {
        fontSize: 12,
        lineHeight: 20 / 12,
    },
    sm: {
        fontSize: 14,
        lineHeight: 22 / 14,
    },
    md: {
        fontSize: 16,
        lineHeight: 24 / 16,
    },
    lg: {
        fontSize: 20,
        lineHeight: 28 / 20,
    },
    xl: {
        fontSize: 24,
        lineHeight: 32 / 24,
    },
    xxl: {
        fontSize: 30,
        lineHeight: 38 / 30,
    },
    xxxl: {
        fontSize: 38,
        lineHeight: 46 / 38,
    },
    huge: {
        fontSize: 46,
        lineHeight: 54 / 46,
        '@media (maxWidth: 768px)': {
            fontSize: '2.5rem', // 40px
            lineHeight: '3rem', // 48px
          },
          '@media (maxWidth: 480px)': {
            fontSize: '2rem', // 32px
            lineHeight: '2.5rem', // 40px
          },
    },
    xhuge: {
        fontSize: 56,
        lineHeight: 64 / 56,
        '@media (maxWidth: 768px)': {
        fontSize: '3rem', // 48px
        lineHeight: '3.5rem', // 56px
      },
      '@media (maxWidth: 480px)': {
        fontSize: '2.5rem', // 40px
        lineHeight: '3rem', // 48px
      },
    },
    xxhuge: {
        fontSize: 68,
        lineHeight: 76 / 68,
        '@media (maxWidth: 768px)': {
            fontSize: '3.75rem', // 60px
            lineHeight: '4.25rem', // 68px
          },
          '@media (maxWidth: 480px)': {
            fontSize: '3rem', // 48px
            lineHeight: '3.5rem', // 56px
          },
    },
};




export const Text: FC<TextProps> = ({ size = "sm", lineBreak = false, children,className ,style, ...rest }) => {
    const textStyle = {
        ...sizes[size],
        ...style,
    };

    return (
        <div >
            <span className={` ${className}`} style={textStyle} {...rest}>
                {children}
            </span>
            {lineBreak && <br />}
        </div>
    );
};

export default Text;