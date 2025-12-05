import styled from "styled-components";
import { colors } from "src/constants/colors";
import { Button } from "src/components/button";

export type DelegationProps = {
  name: string;
  dateFrom: string;
  dateTo: string;
  status: Status;
}

type Status = "Accepted" | "Pending" | "Rejected";

const getStatusColor = (status: Status) => {
  switch (status) {
    case "Accepted":
      return colors.green[1];
    case "Pending":
      return colors.grey[3];
    case "Rejected":
      return colors.red[1];
    default:
      return colors.grey[1];
  }
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  Name: styled.h3`
    margin: 0;
    color: ${colors.grey[8]};
  `,
  Date: styled.p`
    margin: 0;
    color: ${colors.grey[8]};
  `,
  DateFrame: styled.span`
    /* font-weight: bold; */
  `,
  BottomWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Status: styled.div<{ $status: Status }>`
    background-color: green;
    width: fit-content;
    padding: 6px;
    border-radius: 4px;
    background-color: ${({ $status }) => getStatusColor($status)};
  `,
  ViewDetailsButton: styled(Button)`
    padding: 6px;
  `
};

export const Delegation = ({ name, dateFrom, dateTo, status }: DelegationProps) => {
  const statusMessage = (() => {
    switch (status) {
      case "Accepted":
        return 'Zatwierdzona';
      case "Pending":
        return "Oczekuje";
      case "Rejected":
        return "Odrzucona";
      default:
        return "";
    }
  })();
  return (
    <S.Wrapper>
      <S.Name>{name}</S.Name>
      <S.Date>
        <S.DateFrame>{dateFrom}</S.DateFrame> - <S.DateFrame>{dateTo}</S.DateFrame>
      </S.Date>
      <S.BottomWrapper>
        <S.Status $status={status}>{statusMessage}</S.Status>
        <S.ViewDetailsButton>View Details</S.ViewDetailsButton>
      </S.BottomWrapper>
    </S.Wrapper>
  );
};