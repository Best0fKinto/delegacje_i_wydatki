import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { colors } from "src/constants/colors";
import { managerApi, EmployeeDelegation, EmployeeResponse } from "src/lib/api";
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
    gap: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${colors.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  DelegationInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
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
  DelegationDestination: styled.p`
    margin: 4px 0 0 0;
    color: ${colors.grey[7]};
    font-size: 13px;
  `,
  DelegationActions: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,
  DelegationStatus: styled.span<{ status: string }>`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    background: ${props => {
      const s = props.status.toUpperCase();
      if (s === 'APPROVED') return colors.green[0];
      if (s === 'REJECTED') return colors.red[0];
      return colors.yellow[0];
    }};
    color: ${props => {
      const s = props.status.toUpperCase();
      if (s === 'APPROVED') return colors.green[2];
      if (s === 'REJECTED') return colors.red[1];
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
  const location = useLocation();
  const [employee, setEmployee] = useState<EmployeeResponse | null>(null);
  const [delegations, setDelegations] = useState<EmployeeDelegation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const employeeId = id ? parseInt(id, 10) : null;

  const fetchEmployeeData = async () => {
    if (!employeeId) {
      setError('Invalid employee id');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await managerApi.getEmployeeDetails(employeeId);
      setEmployee(data.employee);
      setDelegations(data.delegations);
      setError(null);
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to load employee');
      console.error('Failed to fetch employee data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);

  // Refetch danych po powrocie z widoku delegacji
  useEffect(() => {
    if (employeeId && !loading) {
      fetchEmployeeData();
    }
  }, [location.key]);

  const handleDelegationClick = (delegationId: number) => {
    navigate(routes.managerDelegation.replace(':id', delegationId.toString()));
  };

  const handleBack = () => {
    navigate(routes.managerDashboard);
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Back to employees</S.BackButton>
          <S.Heading>Employee profile</S.Heading>
        </S.Header>
        <S.LoadingMessage>Loading…</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Back to employees</S.BackButton>
          <S.Heading>Employee profile</S.Heading>
        </S.Header>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Back to employees</S.BackButton>
        <S.Heading>
          {employee ? `${employee.first_name} ${employee.last_name}` : `Employee #${employeeId}`}
        </S.Heading>
        {employee && <S.DelegationDates>{employee.email}</S.DelegationDates>}
        <S.Subheading>Employee delegations</S.Subheading>
      </S.Header>
      {delegations.length === 0 ? (
        <S.LoadingMessage>This employee has no delegations</S.LoadingMessage>
      ) : (
        <S.DelegationList>
          {delegations.map((delegation) => (
            <S.DelegationCard 
              key={delegation.id}
              onClick={() => handleDelegationClick(delegation.id)}
            >
              <S.DelegationInfo>
                <S.DelegationTitle>
                  {delegation.name || `Delegation #${delegation.id}`}
                </S.DelegationTitle>
                <S.DelegationDates>
                  {delegation.start_date} - {delegation.end_date}
                </S.DelegationDates>
                {(delegation.city || delegation.country) && (
                  <S.DelegationDestination>
                    {[delegation.city, delegation.country].filter(Boolean).join(', ')}
                  </S.DelegationDestination>
                )}
              </S.DelegationInfo>
              <S.DelegationActions>
                <S.DelegationStatus status={delegation.status}>
                  {delegation.status.toUpperCase()}
                </S.DelegationStatus>
              </S.DelegationActions>
            </S.DelegationCard>
          ))}
        </S.DelegationList>
      )}
    </S.Wrapper>
  );
}
