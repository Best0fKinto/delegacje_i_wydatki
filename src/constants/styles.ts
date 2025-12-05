import { css } from "styled-components";
import { colors } from "./colors";

export const baseButtonStyles = css`
  font-family: 'Montserrat';
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.1s ease-out;
`;

export const defaultButtonStyles = css`
  ${baseButtonStyles};
  font-size: 16px;
  padding: 4px 8px;
  background-color: ${colors.navy[2]};

  &:hover {
    background-color: ${colors.navy[3]};
  }

  &:active {
    background-color: ${colors.navy[3]};
    filter: brightness(1.05);
  }
`;

export const textButtonStyles = css`
  ${baseButtonStyles};
  background-color: transparent;
  font-size: 16px;
  color: ${colors.white};

  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
`;