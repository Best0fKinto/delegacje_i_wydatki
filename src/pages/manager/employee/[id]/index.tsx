import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { managerApi, EmployeeDelegation } from "src/lib/api";
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

export default function ManagerEmployeeProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [delegations, setDelegations] = useState<EmployeeDelegation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const employeeId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!employeeId) {
      setError('Nieprawidłowy ID pracownika');
      setLoading(false);
      return;
    }

    const fetchDelegations = async () => {
      try {
        setLoading(true);
        const data = await managerApi.getEmployeeDelegations(employeeId);
        setDelegations(data);
        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || 'Nie udało się pobrać delegacji pracownika');
        console.error('Failed to fetch employee delegations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDelegations();
  }, [employeeId]);

  const handleBack = () => {
    navigate(routes.managerDashboard);
  };

  const employeeName = delegations[0]?.employee_name || `Pracownik #${employeeId}`;

  if (loading) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Powrót do listy pracowników</S.BackButton>
          <S.Heading>Profil pracownika</S.Heading>
        </S.Header>
        <S.LoadingMessage>Ładowanie...</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Powrót do listy pracowników</S.BackButton>
          <S.Heading>Profil pracownika</S.Heading>
        </S.Header>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Powrót do listy pracowników</S.BackButton>
        <S.Heading>{employeeName}</S.Heading>
        <S.Subheading>Delegacje pracownika</S.Subheading>
      </S.Header>
      {delegations.length === 0 ? (
        <S.LoadingMessage>Pracownik nie ma żadnych delegacji</S.LoadingMessage>
      ) : (
        <S.DelegationList>
          {delegations.map((delegation) => (
            <S.DelegationCard key={delegation.id}>
              <S.DelegationInfo>
                <S.DelegationTitle>Delegacja #{delegation.id}</S.DelegationTitle>
                <S.DelegationDates>
                  {delegation.start_date} - {delegation.end_date}
                </S.DelegationDates>
              </S.DelegationInfo>
              <S.DelegationStatus status={delegation.status}>
                {delegation.status}
              </S.DelegationStatus>
            </S.DelegationCard>
          ))}
        </S.DelegationList>
      )}
    </S.Wrapper>
  );
}
