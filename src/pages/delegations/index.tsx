import styled from "styled-components";
import { colors } from "src/constants/colors";
import { Delegation, DelegationProps } from "./components/delegation";

const mockDelegations: DelegationProps[] = [
  {
    name: "Delegacja służbowa do Krakowa",
    dateFrom: "2024-01-10",
    dateTo: "2024-01-12",
    status: "Rejected",
  },
];

const moreMockDelegations: DelegationProps[] = Array.from({ length: 10 }, (_, i) => ({
  name: `Delegacja służbowa nr ${i + 1}`,
  dateFrom: `2024-02-${(i + 1).toString().padStart(2, '0')}`,
  dateTo: `2024-02-${(i + 2).toString().padStart(2, '0')}`,
  status: i % 2 === 0 ? "Accepted" : "Pending",
}));

const S = {
  Wrapper: styled.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  // HeadingWrapper: styled.div`
  //   width: 100%;
  //   display: flex;
  //   justify-content: center;
  //   height: 60px;
  // `,
  Heading: styled.h1`
    margin-block: 32px;
    color: ${colors.grey[8]};
  `,
  DelegationList: styled.ol`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline: 16px;
    box-sizing: border-box;
    gap: 16px;
  `,
};

export default function DelegationsPage() {
  return <S.Wrapper>
    <S.Heading>Moje delegacje</S.Heading>
    <S.DelegationList>
      {mockDelegations.concat(moreMockDelegations).map((delegation, index) => (
        <li key={index}>
          <Delegation {...delegation} />
        </li>
      ))}
    </S.DelegationList>
  </S.Wrapper>;
}