import styled from "styled-components"
import { defaultButtonStyles, textButtonStyles } from "src/constants/styles";
import type { PropsWithChildren } from "react";

type ButtonVariant = 'default' | 'text';

type Props = {
  variant?: ButtonVariant;
  className?: string;
}

const S = {
  Button: styled.button<{ variant: ButtonVariant }>`
    ${({ variant }) => {
      switch (variant) {
        case "text":
          return textButtonStyles;
        default:
          return defaultButtonStyles;
      }
    }}
  `,
};

export const Button = ({ children, className, variant = 'default' }: PropsWithChildren<Props>) => {
  return (
    <S.Button className={className} variant={variant}>
      {children}
    </S.Button>
  );
};