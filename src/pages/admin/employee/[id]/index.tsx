import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { adminApi, EmployeeResponse } from "src/lib/api";
import { routes } from "src/constants/routes";

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
  `,
  BackButton: styled.button`
    background: none;
    border: none;
    color: ${colors.blue[1]};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 0;
    margin-bottom: 16px;

    &:hover {
      text-decoration: underline;
    }
  `,
  Heading: styled.h1`
    margin: 0 0 8px 0;
    color: ${colors.grey[8]};
  `,
  EmployeeInfo: styled.div`
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
  `,
  InfoRow: styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  `,
  InfoLabel: styled.span`
    font-weight: 600;
    color: ${colors.grey[7]};
  `,
  InfoValue: styled.span`
    color: ${colors.grey[6]};
  `,
  Subheading: styled.h2`
    margin: 32px 0 16px 0;
    color: ${colors.grey[7]};
    font-size: 20px;
  `,
  DelegationList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,
  DelegationCard: styled.div`
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  DelegationInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  DelegationTitle: styled.h3`
    margin: 0;
    color: ${colors.navy[2]};
    font-size: 16px;
  `,
  DelegationDates: styled.p`
    margin: 0;
    color: ${colors.grey[6]};
    font-size: 14px;
  `,
  DelegationStatus: styled.span<{ status: string }>`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${props => {
      const s = props.status.toLowerCase();
      if (s === 'approved' || s === 'accepted') return colors.green[0];
      if (s === 'rejected') return colors.red[0];
      return colors.yellow[0];
    }};
    color: ${props => {
      const s = props.status.toLowerCase();
      if (s === 'approved' || s === 'accepted') return colors.green[2];
      if (s === 'rejected') return colors.red[1];
      return colors.yellow[2];
    }};
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

export default function AdminEmployeeProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeeResponse | null>(null);
  const [manager, setManager] = useState<EmployeeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Note: Since there's no endpoint to get delegations for a specific employee as admin,
  // we'll show a message that delegations are not available in this view
  // In a real scenario, you might need to add an admin endpoint for this

  const employeeId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!employeeId) {
      setError('Nieprawidłowy ID pracownika');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const employeeData = await adminApi.getEmployee(employeeId);

        if (!employeeData) {
          setError('Nie znaleziono pracownika');
          setLoading(false);
          return;
        }

        setEmployee(employeeData);

        // Fetch manager if assigned
        if (employeeData.manager_id) {
          const managerData = await adminApi.getEmployee(employeeData.manager_id);
          setManager(managerData);
        }

        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || 'Nie udało się pobrać danych pracownika');
        console.error('Failed to fetch employee data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleBack = () => {
    navigate(routes.adminDashboard);
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
          <S.Heading>Profil pracownika</S.Heading>
        </S.Header>
        <S.LoadingMessage>Ładowanie...</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error || !employee) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
          <S.Heading>Profil pracownika</S.Heading>
        </S.Header>
        <S.ErrorMessage>{error || 'Nie znaleziono pracownika'}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
        <S.Heading>{employee.username}</S.Heading>
        
        <S.EmployeeInfo>
          <S.InfoRow>
            <S.InfoLabel>Email:</S.InfoLabel>
            <S.InfoValue>{employee.email}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Rola:</S.InfoLabel>
            <S.InfoValue>{employee.role}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Status:</S.InfoLabel>
            <S.InfoValue>{employee.is_active ? 'Aktywny' : 'Nieaktywny'}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Menedżer:</S.InfoLabel>
            <S.InfoValue>{manager ? manager.username : 'Brak'}</S.InfoValue>
          </S.InfoRow>
        </S.EmployeeInfo>
        
        <S.Subheading>Delegacje pracownika</S.Subheading>
      </S.Header>
      <S.LoadingMessage>
        Widok delegacji dla adminów będzie dostępny po rozszerzeniu API
      </S.LoadingMessage>
    </S.Wrapper>
  );
}
