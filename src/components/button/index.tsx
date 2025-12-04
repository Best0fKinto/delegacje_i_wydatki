import styled from "styled-components"
import { defaultButtonStyles, textButtonStyles } from "src/constants/styles";
import type { PropsWithChildren } from "react";

type ButtonVariant = 'default' | 'text';

type Props = {
  variant?: ButtonVariant;
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

export const Button = ({ children, variant = 'default' }: PropsWithChildren<Props>) => {
  return <S.Button variant={variant}>
    {children}
  </S.Button>
};