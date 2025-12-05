import styled from "styled-components";
import { colors } from "src/constants/colors";
import { FormGroup, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "src/components/button";
import plus from "src/assets/plus.svg";
// import dayjs from "dayjs";

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
    /* margin: 0; */
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
}

export default function AddDelegationPage() {
  return (
    <S.Wrapper>
      <S.Heading>Utwórz delegację</S.Heading>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <S.Form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <S.DataGroup>
            <TextField label="Nazwa delegacji" />
            <S.FormGroup>
              <S.RowTextField label="Kraj" />
              <S.RowTextField label="Miasto" />
            </S.FormGroup>
            <S.FormGroup>
              <S.DatePicker label="Data od" disableFuture={true} />
              <S.DatePicker label="Data do" disableFuture={true} />
            </S.FormGroup>
          </S.DataGroup>
          <S.DataGroup>
            <S.ExpensesHeadingWrapper>
              <S.ExpensesHeading>Wydatki</S.ExpensesHeading>
              <S.Button onClick={() => {}}>
                <S.PlusIcon src={plus} alt="Add" />
              </S.Button>
            </S.ExpensesHeadingWrapper>
          </S.DataGroup>
        </S.Form>
      </LocalizationProvider>
    </S.Wrapper>
  );
}