import styled from "styled-components";
import { colors } from "src/constants/colors";
import { Button } from "src/components/button";

const S = {
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${colors.navy[2]};
    color: ${colors.white};
  `,
  Heading: styled.h1`
    margin: 0;
    font-size: 24px;
  `,
};

export default function Header() {
  return <S.Header>
    <S.Heading>Delegations</S.Heading>
    <Button variant="text">Logout</Button>
  </S.Header>;
}