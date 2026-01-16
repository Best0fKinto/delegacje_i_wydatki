import styled from "styled-components";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { colors } from "src/constants/colors";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Button } from "src/components/button";
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
    max-width: 800px;
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
    margin: 0 0 32px 0;
    color: ${colors.grey[8]};
  `,
  Form: styled.form`
    width: 100%;
    max-width: 800px;
    padding-inline: 60px;
    box-sizing: border-box;
    background: ${colors.white};
    border: 1px solid ${colors.grey[2]};
    border-radius: 8px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  TextField: styled(TextField)`
    width: 100%;
  `,
  FormControl: styled(FormControl)`
    width: 100%;
  `,
  ButtonGroup: styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  `,
  ErrorMessage: styled.p`
    color: ${colors.red[1]};
    font-size: 14px;
    margin: 0;
  `,
  SuccessMessage: styled.p`
    color: ${colors.green[2]};
    font-size: 14px;
    margin: 0;
  `,
};

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [managerId, setManagerId] = useState<number | "">("");
  const [managers, setManagers] = useState<EmployeeResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingManagers, setLoadingManagers] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setLoadingManagers(true);
        const data = await adminApi.listManagers();
        setManagers(data);
      } catch (err) {
        console.error('Failed to fetch managers:', err);
        setError('Nie udało się pobrać listy menedżerów');
      } finally {
        setLoadingManagers(false);
      }
    };

    fetchManagers();
  }, []);

  const handleBack = () => {
    navigate(routes.adminDashboard);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !email || !password) {
      setError("Wszystkie pola (oprócz menedżera) są wymagane");
      return;
    }

    if (password.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków");
      return;
    }

    try {
      setIsLoading(true);
      
      await adminApi.createEmployee({
        username,
        email,
        password,
        manager_id: managerId === "" ? undefined : managerId,
      });

      setSuccess(`Pracownik "${username}" został utworzony pomyślnie!`);
      
      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
      setManagerId("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(routes.adminDashboard);
      }, 2000);
    } catch (err: any) {
      console.error("Failed to create employee:", err);
      setError(err?.data?.message || 'Nie udało się utworzyć pracownika');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Powrót do panelu</S.BackButton>
        <S.Heading>Utwórz Nowego Pracownika</S.Heading>
      </S.Header>
      
      <S.Form onSubmit={handleSubmit}>
        <S.TextField
          label="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          required
          disabled={isLoading}
        />
        
        <S.TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
          disabled={isLoading}
        />
        
        <S.TextField
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          disabled={isLoading}
          helperText="Minimum 8 znaków"
        />

        <S.FormControl variant="outlined" disabled={isLoading || loadingManagers}>
          <InputLabel id="manager-select-label">Menedżer (opcjonalnie)</InputLabel>
          <Select
            labelId="manager-select-label"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value as number | "")}
            label="Menedżer (opcjonalnie)"
          >
            <MenuItem value="">
              <em>Brak przypisania</em>
            </MenuItem>
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.username} ({manager.email})
              </MenuItem>
            ))}
          </Select>
        </S.FormControl>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {success && <S.SuccessMessage>{success}</S.SuccessMessage>}

        <S.ButtonGroup>
          <Button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            variant="text"
          >
            Anuluj
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Tworzenie...' : 'Utwórz Pracownika'}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Wrapper>
  );
}
