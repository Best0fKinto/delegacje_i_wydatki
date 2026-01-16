import styled from "styled-components";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "src/components/dialog";
import { FormGroup, TextField } from "@mui/material";
import { colors } from "src/constants/colors";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "src/components/button";

type Props = {
  isDialogOpen: boolean;
  onCloseDialog: () => void;
}

const S = {
  DataGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  FormGroup: styled(FormGroup)`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,
  RowTextField: styled(TextField)`
    flex: 1;
  `,
  DatePicker: styled(DatePicker)`
    flex: 1;
  `,
  FileInputWrapper: styled.div<{ $withGap: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ $withGap }) => ($withGap ? '8px' : '0')};
    padding: 8px;
    background-color: ${colors.grey[1]};
    box-sizing: border-box;
  `,
  FileInputLabel: styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    background-color: ${colors.blue[1]};
  `,
  HiddenFileInput: styled.input`
    display: none;
  `,
  FileWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
  `,
  FileName: styled.span`
    color: black;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    max-width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  DeleteReceiptButton: styled(Button)`
    padding: 6px;
    background-color: ${colors.red[1]};
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 14px;
    margin: 0;
  `,
  Button: styled(Button)`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  `,
};

export const ExpenseDialog = ({ isDialogOpen, onCloseDialog }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<number | string>('');

  return (
    <Dialog open={isDialogOpen} onClose={onCloseDialog}>
      <DialogHeader title="Dodaj wydatek" onClose={onCloseDialog} />
      <DialogContent>
        <S.DataGroup>
          <TextField label="Tytuł" fullWidth />
          <S.FormGroup>
            <S.RowTextField label="Kwota" type="number" />
            <S.RowTextField label="Waluta" />
          </S.FormGroup>
          <S.DatePicker label="Data" disableFuture={true} />
          <TextField label="Opis" multiline rows={4} fullWidth />
          <S.FileInputWrapper $withGap={!!selectedFile}>
            <S.FileInputLabel htmlFor="receipt-upload">
              Wybierz paragon
            </S.FileInputLabel>
            <S.HiddenFileInput
              id="receipt-upload"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setSelectedFile(file);
              }}
            />
            <S.FileWrapper>
              {selectedFile && <S.FileName>{selectedFile.name}</S.FileName>}
              {selectedFile && (
                <S.DeleteReceiptButton onClick={() => setSelectedFile(null)}>
                  Usuń
                </S.DeleteReceiptButton>
              )}
            </S.FileWrapper>
        </S.FileInputWrapper>
          <S.Button type="submit" onClick={() => {

          }}>Dodaj wydatek</S.Button>
        </S.DataGroup>
      </DialogContent>
    </Dialog>
  )
}