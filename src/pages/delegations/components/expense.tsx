import styled from "styled-components";
import { colors } from "src/constants/colors";
import { boxShadow } from "src/constants/box-shadow";

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: ${boxShadow};
    padding: 16px;
    gap: 16px;
    border: 1px solid ${colors.grey[1]};
    color: ${colors.grey[8]};
  `,
  Title: styled.h3`
    margin: 0;
    color: ${colors.grey[8]};
  `,
  DataWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  DataRow: styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
  `
};

export type ExpenseProps = {
  title: string;
  amount: number;
  currency: string;
  date: string;
  onDelete?: () => void;
};

export const Expense = ({ title, amount, currency, date, onDelete }: ExpenseProps) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.DataWrapper>
        <S.DataRow>
          <span>Kwota</span>
          <span>{amount}</span>
        </S.DataRow>
        <S.DataRow>
          <span>Waluta</span>
          <span>{currency}</span>
        </S.DataRow>
        <S.DataRow>
          <span>Data</span>
          <span>{date}</span>
        </S.DataRow>
      </S.DataWrapper>
    </S.Wrapper>
  );
};