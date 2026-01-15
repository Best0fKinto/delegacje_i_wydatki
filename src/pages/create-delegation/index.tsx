import styled from "styled-components";
import { useState } from "react";
import { colors } from "src/constants/colors";
import { FormGroup, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "src/components/button";
import plus from "src/assets/plus-white.svg";
import { Expense, ExpenseProps } from "../delegations/components/expense";
import { Dialog, DialogContent, DialogHeader } from "src/components/dialog";
import { delegationsApi } from "src/lib/api/delegations";
import type { Dayjs } from "dayjs";

const mockExpenses: ExpenseProps[] = [];

const S = {
  Wrapper: styled.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  Heading: styled.h1`
    margin-block: 32px;
    color: ${colors.grey[8]};
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-inline: 60px;
    background-color: ${colors.white};
    border-radius: 8px;
    padding: 24px;
    gap: 16px;
    width: 100%;
    max-width: 1000px;
  `,
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
  ExpensesHeadingWrapper: styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;
    gap: 8px;
  `,
  ExpensesHeading: styled.h2`
    text-align: center;
    color: ${colors.grey[8]};
  `,
  Button: styled(Button)`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  `,
  PlusIcon: styled.img`
    width: 18px;
    height: 18px;
  `,
  ExpenseList: styled.ol`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    margin: 0;
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
}

export default function AddDelegationPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onCloseDialog = () => {
    setSelectedFile(null);
    setIsDialogOpen(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      setError('Proszę wybrać daty delegacji');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const delegation = await delegationsApi.createDelegation({
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        status: 'draft',
      });

      console.log('Delegation created:', delegation);
      alert('Delegacja została utworzona pomyślnie!');
      
      // Reset form
      setStartDate(null);
      setEndDate(null);
    } catch (err: any) {
      setError(err?.data?.message || 'Nie udało się utworzyć delegacji');
      console.error('Failed to create delegation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Heading>Utwórz delegację</S.Heading>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <S.Form onSubmit={handleSubmit}>
          <S.DataGroup>
            <TextField label="Nazwa delegacji" />
            <S.FormGroup>
              <S.RowTextField label="Kraj" />
              <S.RowTextField label="Miasto" />
            </S.FormGroup>
            <S.FormGroup>
              <S.DatePicker 
                label="Data od" 
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                disableFuture={true} 
              />
              <S.DatePicker 
                label="Data do" 
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                disableFuture={true} 
              />
            </S.FormGroup>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          </S.DataGroup>
          <S.DataGroup>
            <S.ExpensesHeadingWrapper>
              <S.ExpensesHeading>Wydatki</S.ExpensesHeading>
              <S.Button type="button" onClick={() => setIsDialogOpen(true)}>
                <S.PlusIcon src={plus} alt="Add" />
              </S.Button>
            </S.ExpensesHeadingWrapper>
            <S.ExpenseList>
              {mockExpenses.map((expense, index) => (
                <li key={index}>
                  <Expense {...expense} />
                </li>
              ))}
            </S.ExpenseList>
          </S.DataGroup>
          <S.Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Tworzenie...' : 'Utwórz delegację'}
          </S.Button>
        </S.Form>
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
                  onChange={handleFileChange}
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
              <S.Button type="submit" onClick={() => setIsDialogOpen(false)}>Dodaj wydatek</S.Button>
            </S.DataGroup>
          </DialogContent>
        </Dialog>
      </LocalizationProvider>
    </S.Wrapper>
  );
}