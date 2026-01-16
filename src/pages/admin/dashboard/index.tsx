import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { adminApi, EmployeeResponse } from "src/lib/api";
import { routes } from "src/constants/routes";
import { Button } from "src/components/button";

const S = {
  Wrapper: styled.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  Header: styled.div`
    width: 100%;
    max-width: 1200px;
    padding-inline: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `,
  Heading: styled.h1`
    margin: 32px 0;
    color: ${colors.grey[8]};
  `,
  Actions: styled.div`
    display: flex;
    gap: 12px;
  `,
  ManagerList: styled.div`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,
  ManagerCard: styled.div`
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${colors.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  ManagerName: styled.h3`
    margin: 0 0 8px 0;
    color: ${colors.navy[2]};
    font-size: 18px;
  `,
  ManagerEmail: styled.p`
    margin: 0;
    color: ${colors.grey[6]};
    font-size: 14px;
  `,
  LoadingMessage: styled.p`
    color: ${colors.grey[6]};
    font-size: 16px;
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 16px;
  `,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [managers, setManagers] = useState<EmployeeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoading(true);
        const data = await adminApi.listManagers();
        setManagers(data);
        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || 'Nie udało się pobrać listy menedżerów');
        console.error('Failed to fetch managers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  const handleManagerClick = (managerId: number) => {
    navigate(routes.adminManager.replace(':id', managerId.toString()));
  };

  const handleCreateManager = () => {
    navigate(routes.adminCreateManager);
  };

  const handleCreateEmployee = () => {
    navigate(routes.adminCreateEmployee);
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Heading>Panel Administracyjny</S.Heading>
        <S.LoadingMessage>Ładowanie...</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Heading>Panel Administracyjny</S.Heading>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Heading>Panel Administracyjny</S.Heading>
      <S.Header>
        <h2 style={{ margin: 0, color: colors.grey[7], fontSize: '20px' }}>Lista Menedżerów</h2>
        <S.Actions>
          <Button onClick={handleCreateManager}>Utwórz Menedżera</Button>
          <Button onClick={handleCreateEmployee}>Utwórz Pracownika</Button>
        </S.Actions>
      </S.Header>
      {managers.length === 0 ? (
        <S.LoadingMessage>Brak menedżerów w systemie</S.LoadingMessage>
      ) : (
        <S.ManagerList>
          {managers.map((manager) => (
            <S.ManagerCard
              key={manager.id}
              onClick={() => handleManagerClick(manager.id)}
            >
              <S.ManagerName>{manager.username}</S.ManagerName>
              <S.ManagerEmail>{manager.email}</S.ManagerEmail>
            </S.ManagerCard>
          ))}
        </S.ManagerList>
      )}
    </S.Wrapper>
  );
}
