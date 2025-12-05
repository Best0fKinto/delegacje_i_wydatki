import styled from "styled-components";
import { colors } from "src/constants/colors";
import { Button } from "src/components/button";

const S = {
  Header: styled.header`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    height: 40px;
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

export const Header = () => {
  return <S.Header>
    <S.Heading>Delegacje</S.Heading>
    <Button variant="text">Wyloguj</Button>
  </S.Header>;
}