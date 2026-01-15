import styled from "styled-components"
import { defaultButtonStyles, textButtonStyles } from "src/constants/styles";
import type { PropsWithChildren } from "react";

type ButtonVariant = 'default' | 'text';

type Props = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
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

export const Button = ({ children, onClick, type = 'button', className, variant = 'default', disabled }: PropsWithChildren<Props>) => {
  return (
    <S.Button onClick={onClick} type={type} className={className} variant={variant} disabled={disabled}>
      {children}
    </S.Button>
  );
};