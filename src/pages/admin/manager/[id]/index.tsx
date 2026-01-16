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
  ManagerInfo: styled.div`
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
  EmployeeList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-inline: 60px;
    max-width: 1200px;
    box-sizing: border-box;
    gap: 16px;
  `,
  EmployeeCard: styled.div`
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${colors.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  EmployeeName: styled.h3`
    margin: 0 0 4px 0;
    color: ${colors.navy[2]};
    font-size: 16px;
  `,
  EmployeeEmail: styled.p`
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

export default function AdminManagerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [manager, setManager] = useState<EmployeeResponse | null>(null);
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const managerId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!managerId) {
      setError('Nieprawidłowy ID menedżera');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch manager and all employees
        const [managerData, allEmployees] = await Promise.all([
          adminApi.getEmployee(managerId),
          adminApi.listEmployees(),
        ]);

        if (!managerData) {
          setError('Nie znaleziono menedżera');
          setLoading(false);
          return;
        }

        setManager(managerData);
        
        // Filter employees assigned to this manager
        const assignedEmployees = allEmployees.filter(
          emp => emp.manager_id === managerId && emp.role === 'employee'
        );
        setEmployees(assignedEmployees);
        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || 'Nie udało się pobrać danych menedżera');
        console.error('Failed to fetch manager data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [managerId]);

  const handleBack = () => {
    navigate(routes.adminDashboard);
  };

  const handleEmployeeClick = (employeeId: number) => {
    navigate(routes.adminEmployee.replace(':id', employeeId.toString()));
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
          <S.Heading>Profil menedżera</S.Heading>
        </S.Header>
        <S.LoadingMessage>Ładowanie...</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error || !manager) {
    return (
      <S.Wrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
          <S.Heading>Profil menedżera</S.Heading>
        </S.Header>
        <S.ErrorMessage>{error || 'Nie znaleziono menedżera'}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
        <S.Heading>{manager.username}</S.Heading>
        
        <S.ManagerInfo>
          <S.InfoRow>
            <S.InfoLabel>Email:</S.InfoLabel>
            <S.InfoValue>{manager.email}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Rola:</S.InfoLabel>
            <S.InfoValue>{manager.role}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>Status:</S.InfoLabel>
            <S.InfoValue>{manager.is_active ? 'Aktywny' : 'Nieaktywny'}</S.InfoValue>
          </S.InfoRow>
        </S.ManagerInfo>
        
        <S.Subheading>Przypisani pracownicy ({employees.length})</S.Subheading>
      </S.Header>
      {employees.length === 0 ? (
        <S.LoadingMessage>Brak przypisanych pracowników</S.LoadingMessage>
      ) : (
        <S.EmployeeList>
          {employees.map((employee) => (
            <S.EmployeeCard
              key={employee.id}
              onClick={() => handleEmployeeClick(employee.id)}
            >
              <S.EmployeeName>{employee.username}</S.EmployeeName>
              <S.EmployeeEmail>{employee.email}</S.EmployeeEmail>
            </S.EmployeeCard>
          ))}
        </S.EmployeeList>
      )}
    </S.Wrapper>
  );
}
