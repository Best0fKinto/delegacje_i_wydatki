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
    position: relative;
  `,
  Title: styled.h3`
    margin: 0;
    color: ${colors.grey[8]};
    padding-right: 32px;
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
  `,
  DeleteButton: styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: ${colors.red[0]};
    color: white;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: background-color 0.2s;
    padding: 0;
    line-height: 1;

    &:hover {
      background: ${colors.red[1]};
    }

    &:active {
      transform: scale(0.95);
    }
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
      {onDelete && (
        <S.DeleteButton onClick={onDelete} type="button" title="Usuń wydatek">
          ×
        </S.DeleteButton>
      )}
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