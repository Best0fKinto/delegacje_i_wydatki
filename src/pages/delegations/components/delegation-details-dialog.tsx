import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "src/components/dialog";
import styled from "styled-components";
import { delegationsApi } from "src/lib/api";
import { Delegation } from "src/lib/api";
import { colors } from "src/constants/colors";
import { Expense } from "./expense";
import { getCurrencyName } from "src/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  delegationId: number;
};

const S = {
  DialogContent: styled(DialogContent)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 600px;
    max-height: 700px;
    overflow-y: auto;
  `,
  Item: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ItemLabel: styled.span`
    font-weight: bold;
  `,
  ExpensesLabel: styled.h3`
    margin: 0;
    margin-top: 16px;
    margin-bottom: 8px;
    color: ${colors.grey[8]};
    text-align: center;
  `,
  ExpenseList: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
}

export const DelegationDetailsDialog = ({ delegationId, isOpen, onClose }: Props) => {
  const [delegation, setDelegation] = useState<Delegation | null>(null);
  const isLoading = !delegation;

  const hasExpenses = delegation?.expenses && delegation.expenses.length > 0;

  useEffect(() => {
    const fetchDelegationDetails = async () => {
      if (!isOpen) return;
      try {
        const data = await delegationsApi.getDelegation(delegationId);
        setDelegation(data);
      } catch (error) {
        console.error("Failed to fetch delegation details:", error);
      }
    }
    fetchDelegationDetails();
  }, [delegationId, isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader title="Szczegóły delegacji" onClose={onClose}/>
      <S.DialogContent>
        {isLoading && <p>Ładowanie...</p>}
        {!isLoading && delegation && (
          <>
            <S.Item>
              <S.ItemLabel>Nazwa</S.ItemLabel>
              <span>{delegation.name}</span>
            </S.Item>
            <S.Item>
              <S.ItemLabel>Data rozpoczęcia</S.ItemLabel>
              <span>{delegation.start_date}</span>
            </S.Item>
            <S.Item>
              <S.ItemLabel>Data zakończenia</S.ItemLabel>
              <span>{delegation.end_date}</span>
            </S.Item>
            <S.Item>
              <S.ItemLabel>Status</S.ItemLabel>
              <span>{delegation.status}</span>
            </S.Item>
            {delegation.purpose && <S.Item>
              <S.ItemLabel>Cel</S.ItemLabel>
              <span>{delegation.purpose}</span>
            </S.Item>}
            {delegation.city && <S.Item>
              <S.ItemLabel>Miasto</S.ItemLabel>
              <span>{delegation.city}</span>
            </S.Item>}
            {delegation.country && <S.Item>
              <S.ItemLabel>Kraj</S.ItemLabel>
              <span>{delegation.country}</span>
            </S.Item>}
            {hasExpenses && <>
              <S.ExpensesLabel>Wydatki</S.ExpensesLabel>
              <S.ExpenseList>
                {delegation?.expenses?.map((expense) => (
                  <li key={expense.id}>
                    <Expense
                      title={expense.explanation || 'Brak opisu'}
                      amount={expense.amount}
                      date={expense.payed_at ? new Date(expense.payed_at).toISOString().split('T')[0] : 'Nie podano'}
                      currency={getCurrencyName(expense.currency_id ?? 1)}
                    />
                  </li>
                ))}
              </S.ExpenseList>
            </>
          }
          </>
        )}
      </S.DialogContent>
    </Dialog>
  );
}