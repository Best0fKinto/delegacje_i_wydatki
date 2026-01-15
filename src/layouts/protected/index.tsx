import { Outlet } from 'react-router'
import styled from 'styled-components'
import { Sidebar } from '../home/components/sidebar';
import { Header } from '../home/components/header';
import { colors } from 'src/constants/colors';
import { ProtectedRoute } from 'src/components/ProtectedRoute';

const S = {
  PageWrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1px;
    background-color: ${colors.grey[1]};
  `,
  MainContentWrapper: styled.div`
    display: flex;
    flex: 1;
  `,
  Main: styled.main`
    flex: 1;
  `,
};

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <S.PageWrapper>
        <Header />
        <S.MainContentWrapper>
          <Sidebar />
          <S.Main>
            <Outlet />
          </S.Main>
        </S.MainContentWrapper>
      </S.PageWrapper>
    </ProtectedRoute>
  )
}

export default ProtectedLayout
