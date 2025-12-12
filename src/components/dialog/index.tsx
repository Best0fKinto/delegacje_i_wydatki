import styled from "styled-components";
import { colors } from "src/constants/colors";
import { Button } from "../button";
import { Dialog as MUIDialog } from "@mui/material";

type DialogProps = {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

type DialogHeaderProps = {
  title?: string;
  onClose?: () => void;
};

export type DialogRef = {
  showModal: () => void;
  close: () => void;
};

const S = {
  // Dialog: styled(MUIDialog)`
  //   display: flex;
  //   flex-direction: column;
  //   background-color: ${colors.white};
  //   gap: 1px;
  //   border: none;
  //   border-radius: 4px;
  //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  //   padding: 0;
  //   max-width: 500px;
  //   width: 100%;
  //   overflow: visible;

  //   &:not([open]) {
  //     display: none;
  //   }

  //   &::backdrop {
  //     background: rgba(0, 0, 0, 0.5);
  //   }
  // `,
  DialogHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  `,
  DialogTitle: styled.h2`
    color: ${colors.grey[8]};
    margin: 0;
  `,
};

export const DialogHeader = ({ title, onClose }: DialogHeaderProps) => {
  return (
    <S.DialogHeader>
      <S.DialogTitle>{title}</S.DialogTitle>
      {onClose && <Button onClick={onClose}>Zamknij</Button>}
    </S.DialogHeader>
  );
}

export const DialogContent = styled.div`
  padding: 16px;
`;

export const Dialog = ({ children, open, onClose }: DialogProps) => {
  return (
    <MUIDialog open={open} onClose={onClose}>
      {children}
    </MUIDialog>
  );
};