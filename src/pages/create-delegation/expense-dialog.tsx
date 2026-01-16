import styled from "styled-components";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "src/components/dialog";
import { FormGroup, TextField, MenuItem } from "@mui/material";
import { colors } from "src/constants/colors";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "src/components/button";
import type { Dayjs } from "dayjs";
import { ExpenseFormData } from "src/lib/api";

type Props = {
  isDialogOpen: boolean;
  onCloseDialog: () => void;
  onAddExpense: (expense: ExpenseFormData) => void;
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

export const ExpenseDialog = ({ isDialogOpen, onCloseDialog, onAddExpense }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [explanation, setExplanation] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [currencyId, setCurrencyId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1); 
  const [payedAt, setPayedAt] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Validation
    if (!amount || Number(amount) <= 0) {
      setError('Kwota musi być większa od 0');
      return;
    }

    if (!explanation.trim()) {
      setError('Opis jest wymagany');
      return;
    }

    const expenseData: ExpenseFormData = {
      explanation: explanation.trim(),
      amount: Number(amount),
      currency_id: currencyId,
      category_id: categoryId,
      payed_at: payedAt?.format('YYYY-MM-DD'),
    };

    onAddExpense(expenseData);
    
    // Reset form
    setExplanation('');
    setAmount('');
    setCurrencyId(1);
    setCategoryId(1);
    setPayedAt(null);
    setSelectedFile(null);
    setError(null);
    onCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={onCloseDialog}>
      <DialogHeader title="Dodaj wydatek" onClose={onCloseDialog} />
      <DialogContent>
        <S.DataGroup>
          <TextField 
            label="Opis" 
            fullWidth 
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />
          <S.FormGroup>
            <S.RowTextField 
              label="Kwota" 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <S.RowTextField 
              label="Waluta" 
              select
              value={currencyId}
              onChange={(e) => setCurrencyId(Number(e.target.value))}
            >
              <MenuItem value={1}>PLN</MenuItem>
              <MenuItem value={2}>EUR</MenuItem>
              <MenuItem value={3}>USD</MenuItem>
              <MenuItem value={4}>GBP</MenuItem>
            </S.RowTextField>
          </S.FormGroup>
          <S.FormGroup>
            <S.RowTextField 
              label="Kategoria" 
              select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <MenuItem value={1}>Hotel</MenuItem>
              <MenuItem value={2}>Transport</MenuItem>
              <MenuItem value={3}>Food</MenuItem>
              <MenuItem value={4}>Conference</MenuItem>
              <MenuItem value={5}>Other</MenuItem>
            </S.RowTextField>
            <S.DatePicker 
              label="Data" 
              disableFuture={true}
              value={payedAt}
              onChange={(newValue) => setPayedAt(newValue)}
            />
          </S.FormGroup>
          <S.FileInputWrapper $withGap={!!selectedFile}>
            <S.FileInputLabel htmlFor="receipt-upload">
              Wybierz paragon (opcjonalne)
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
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.Button type="button" onClick={handleSubmit}>
            Dodaj wydatek
          </S.Button>
        </S.DataGroup>
      </DialogContent>
    </Dialog>
  )
}