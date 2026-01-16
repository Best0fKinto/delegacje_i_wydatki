import styled from "styled-components";
import { useState } from "react";
import { colors } from "src/constants/colors";
import { FormGroup, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "src/components/button";
import plus from "src/assets/plus-white.svg";
import { Expense } from "../delegations/components/expense";
import { delegationsApi } from "src/lib/api/delegations";
import type { Dayjs } from "dayjs";
import { ExpenseDialog } from "./expense-dialog";
import { ExpenseFormData } from "src/lib/api/delegations";

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
  DeleteReceiptButton: styled(Button)`
    padding: 6px;
    background-color: ${colors.red[1]};
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 14px;
    margin: 0;
  `,
  SubmitWrapper: styled.div`
    display: flex;
    justify-content: center;
  `,
  SubmitButton: styled(Button)`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    padding: 14px;
  `,
}

export default function AddDelegationPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<ExpenseFormData[]>([]);

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  }

  const handleAddExpense = (expense: ExpenseFormData) => {
    setExpenses([...expenses, expense]);
  };

  const handleRemoveExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const getCurrencyName = (currencyId: number): string => {
    const currencies: Record<number, string> = {
      1: 'PLN',
      2: 'EUR',
      3: 'USD',
      4: 'GBP',
    };
    return currencies[currencyId] || 'PLN';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      setError('Proszę wybrać daty delegacji');
      return;
    }

    if (!name.trim()) {
      setError('Nazwa delegacji jest wymagana');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const delegation = await delegationsApi.createDelegation({
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
        name: name.trim(),
        country: country.trim() || undefined,
        city: city.trim() || undefined,
        purpose: purpose.trim() || undefined,
        status: 'draft',
        expenses: expenses.length > 0 ? expenses : undefined,
      });

      console.log('Delegation created:', delegation);
      alert('Delegacja została utworzona pomyślnie!');
      
      // Reset form
      setStartDate(null);
      setEndDate(null);
      setName('');
      setCountry('');
      setCity('');
      setPurpose('');
      setExpenses([]);
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
            <TextField 
              label="Nazwa delegacji" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <S.FormGroup>
              <S.RowTextField 
                label="Kraj" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <S.RowTextField 
                label="Miasto" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </S.FormGroup>
            <TextField 
              label="Cel delegacji" 
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
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
              {expenses.map((expense, index) => (
                <li key={index}>
                    <Expense 
                      title={expense.explanation}
                      amount={expense.amount}
                      currency={getCurrencyName(expense.currency_id)}
                      date={expense.payed_at || 'Nie podano'}
                      onDelete={() => handleRemoveExpense(index)}
                    />
                </li>
              ))}
            </S.ExpenseList>
          </S.DataGroup>
          <S.SubmitWrapper>
            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Tworzenie...' : 'Utwórz delegację'}
            </S.SubmitButton>
          </S.SubmitWrapper>
        </S.Form>
        <ExpenseDialog 
          isDialogOpen={isDialogOpen} 
          onCloseDialog={onCloseDialog}
          onAddExpense={(expense: ExpenseFormData) => {
            handleAddExpense(expense);
            setIsDialogOpen(false);
          }}
        />
      </LocalizationProvider>
    </S.Wrapper>
  );
}