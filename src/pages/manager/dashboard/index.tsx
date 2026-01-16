import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { managerApi, EmployeeResponse } from "src/lib/api";
import { routes } from "src/constants/routes";

const S = {
  Wrapper: styled.section`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  Heading: styled.h1`
    margin-block: 32px;
    color: ${colors.grey[8]};
  `,
  EmployeeList: styled.div`
    width: 100%;
    list-style: none;
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
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${colors.blue[1]};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  EmployeeName: styled.h3`
    margin: 0 0 8px 0;
    color: ${colors.navy[2]};
    font-size: 18px;
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

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await managerApi.listMyEmployees();
        setEmployees(data);
        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || 'Nie udało się pobrać listy pracowników');
        console.error('Failed to fetch employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employeeId: number) => {
    navigate(routes.managerEmployee.replace(':id', employeeId.toString()));
  };

  if (loading) {
    return (
      <S.Wrapper>
        <S.Heading>Moi Pracownicy</S.Heading>
        <S.LoadingMessage>Ładowanie...</S.LoadingMessage>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <S.Heading>Moi Pracownicy</S.Heading>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Heading>Moi Pracownicy</S.Heading>
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
